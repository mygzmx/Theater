import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { ETaskAction, ETaskStatus, ETaskType, ITaskItem, ITaskSetItem } from "../../../interfaces/self.interface";
import { netReceiveTask, netUpdateUserInfo } from "../../../apis/Self";
import { RootStackParamList } from "../../../@types";
const ImgMiddleLine = require('../../../assets/images/self/line.png');
const ImgCoin1 = require('../../../assets/images/self/coin.png')

interface IProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TaskCheckIn', undefined>
  taskSetList: ITaskSetItem[];
  refresh: () => void;
}

export default function TaskList ({ navigation, taskSetList, refresh }: IProps) {
  const toast = useToast()

  const toFinishTask = (item: ITaskItem) => {
    const { taskAction }  = item;
    if(taskAction === ETaskAction.添加桌面) {
      toast.show('zzz...');
    }
    if (taskAction === 2) { // 绑定手机号
      navigation.navigate('Login');
    }
    if (taskAction === 3) { // 从桌面打开
      toast.show('zzz...');
    }
  }
  const toReceiveTask = async (item: ITaskItem) => {
    const { taskId, taskAction }  = item;
    const { message = '' } = await netReceiveTask(taskId);
    toast.show(message);
    refresh();
    // 是否领取加桌奖励
    if (taskAction === ETaskAction.添加桌面) {
      await netUpdateUserInfo({ isAward: 1 })
    }
  }

  return <View style={styles.taskListWrap}>
    {taskSetList.map(task => {
      return <View key={task.taskSetId}>
        <View style={styles.checkinTitle}>
          <View style={styles.checkinTitle2}>
            <Text style={styles.checkinTitleTxt1}>{task.taskSetTitle}</Text>
            { task.taskType === ETaskType.日常任务 && <Text style={styles.checkinTitleTxt2}>每日0点重置</Text>}
          </View>
        </View>
        <Image style={styles.middleLine} source={ImgMiddleLine} />
        <View style={styles.taskContent}>
          { task.taskList.map(item => {
            return <View key={item.taskId} style={styles.taskItem}>
              <View style={styles.taskItemLeft}>
                <View style={styles.taskItemCoin}>
                  <Text style={styles.taskItemTitle} numberOfLines={1} ellipsizeMode={'tail'}>{ item.taskTitle }</Text>
                  <Image style={styles.taskItemCoinImg} source={ImgCoin1}/>
                  <Text style={styles.taskItemCoinTex}>{`+${ item.taskAward }`}</Text>
                </View>
                <Text style={styles.taskItemTip} numberOfLines={1} ellipsizeMode={'tail'}>{ item.tips }</Text>
              </View>

              <View style={styles.taskItemBtnBox}>
                <Pressable
                  style={{
                    ...styles.taskItemBtn,
                    backgroundColor: item.taskStatus === ETaskStatus.去完成 ? '#FF4B00' : '#ffffff',
                    borderColor: item.taskStatus === ETaskStatus.已领取 ? '#9E9E9E' : '#FF4B00',
                  }} onPress={() => item.taskStatus === ETaskStatus.去完成 ? toFinishTask(item) : (item.taskStatus === ETaskStatus.待领取 ? toReceiveTask(item) : null)}>
                  <Text style={{ ...styles.taskItemBtnTxt,
                    color: item.taskStatus === ETaskStatus.去完成 ? '#ffffff' : (item.taskStatus === ETaskStatus.待领取 ? '#FF4B00' : '#9E9E9E')
                  }} >
                    {item.taskStatus === ETaskStatus.去完成 ? '去完成' : (item.taskStatus === ETaskStatus.待领取 ? '领取' : '已领取')}
                  </Text>
                </Pressable>
              </View>
            </View>
          }) }
        </View>

      </View>
    })}
  </View>
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  taskListWrap: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 16,
  },
  checkinTitle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    height: 54,
    borderRadius: 8,
    paddingLeft: 12,
  },
  checkinTitle2: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  checkinTitleTxt1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4b00',
  },
  checkinTitleTxt2: {
    paddingLeft: 6,
    paddingRight: 6,
    height: 24,
    backgroundColor: '#fff9f0',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffc79f',
    fontSize: 12,
    fontWeight: '500',
    color: '#ff8131',
    lineHeight: 24,
    marginLeft: 12,
  },
  middleLine: {
    position: 'relative',
    top: -2,
    height: 1,
    width: width - 64,
    marginLeft: 12,
  },
  taskContent: {
    position: 'relative',
    top: -2,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    width: '100%',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  taskItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  taskItemLeft: {
    flex: 1,
  },
  taskItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191919',
  },
  taskItemCoin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskItemCoinImg: {
    marginLeft: 5,
    width: 19,
    height: 19,
    marginRight: 4,
  },
  taskItemCoinTex: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF4B00',
  },
  taskItemTip: {
    marginTop: 4,
    fontSize: 14,
    color: '#848C9F',
  },
  taskItemBtnBox: {
    paddingLeft: 12,

  },
  taskItemBtn: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FF4B00',
    width: 82,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  taskItemBtnTxt: {
    fontSize: 14,
  }
})
