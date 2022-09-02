import { View, StyleSheet, Dimensions } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import * as WebBrowser from "expo-web-browser";
import SwiperNormal from "../../components/SwiperNormal";
import { netFinishTask, netTaskData } from "../../apis/Self";
import { EIsSign, EOperatingReportType, ISignRecordVos, ITaskSetItem } from "../../interfaces/self.interface";
import { netOperatingReport } from "../../apis/Theater";
import { RootState } from "../../store";
import { OPERATION_TYPE } from "../../utils/const";
import { getLogTime } from "../../utils/logTime";
import Checkin from "./component/Checkin";
import TaskList from "./component/TaskList";

export default function TaskCheckIn ( ) {
  const navigation = useNavigation()
  const [bannerList, setBannerList] = useState<any[]>([]);
  const [isSigns, setIsSign] = useState<EIsSign>(EIsSign.无);
  const [continueDays, setContinueDay] = useState(0);
  const [signRecordVoss, setSignRecordVos] = useState<ISignRecordVos[]>([]);
  const [signTexts, setSignText] = useState('');
  const [taskSetLists, setTaskSetList] = useState<ITaskSetItem[]>([]);
  const isLogin = useSelector((state: RootState) => state.user.user.login)

  useFocusEffect(
    useCallback(() => {
      // console.log('=================显示');
      getTaskData(true);
      return () => {
        // console.log('============隐藏');
      };
    }, []),
  );

  const getTaskData = async (isInit: boolean = false) => {
    const {
      operList = [],
      isSign = EIsSign.无,
      signRecordVos = [],
      continueDay = 0,
      taskSetList = [],
      signText = '',
    } = await netTaskData();
    setBannerList(operList.slice(0, 6));
    setIsSign(isSign);
    setContinueDay(continueDay);
    setSignRecordVos(signRecordVos);
    setSignText(signText);
    setTaskSetList(taskSetList);
    if (isInit) {
      // Banner展现（轮播出现才记一次展现）
      if (operList.length > 0) {
        const idList = operList.slice(0, 6).map(ban => ban.id);
        await netOperatingReport(idList, EOperatingReportType.曝光)
      }
      await getHasOpenApp(taskSetList)
    }
  }
  // 每次打开判断来源，筛选任务是否完成，
  const getHasOpenApp = async(taskSetList: any[]) => {
    for (let i = 0; i < taskSetList.length; i++) {
      const _taskList = taskSetList[i].taskList
      if (Array.isArray(_taskList) && _taskList.length > 0) {
        if (isLogin) { // 是否登录
          const item = _taskList.find((task: any) => task.taskAction === 2) // 绑定手机号
          if (item && item.taskStatus === 1) {
            await netFinishTask({ action: 2 });
            await getTaskData()
          }
        }
      }
    }
  }

  const bannerLink = (item: any, index: number) => {
    const { id, bookId, operationInfo = {} } = item;
    netOperatingReport(id, EOperatingReportType.点击).then(() => {})
    const { actType, actUrl } = operationInfo;
    if (OPERATION_TYPE[actType] === '剧集') {
      const params = {
        bookId,
        omap: {
          origin: '运营位',
          action: '2',
          channel_id: 'yyw',
          channel_name: '运营位',
          channel_pos: 0,
          column_id: 'yyw_task_banner',
          column_name: '运营位签到页顶部banner',
          column_pos: 0,
          content_id: bookId,
          content_pos: index,
          content_type: '2',
          trigger_time: getLogTime()
        }
      }
      // @ts-ignore
      navigation.navigate({ name: 'Player', params });
    } else {
      WebBrowser.openBrowserAsync(actUrl).then(() => {})
    }
  }
  return <View style={styles.taskWrap}>
    { bannerList.length > 0 && <SwiperNormal bannerList={bannerList} bannerLink={bannerLink}/>}
    <Checkin
      signText={signTexts}
      isSign={isSigns}
      signRecordVos={signRecordVoss}
      continueDay={continueDays}
      refresh={() => getTaskData()}
    />
    <TaskList taskSetList={taskSetLists} refresh={() => getTaskData()}/>
  </View>
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  taskWrap: {
    width,
    minHeight: height,
    backgroundColor: 'rgba(243, 245, 249, 1)',
  }
})
