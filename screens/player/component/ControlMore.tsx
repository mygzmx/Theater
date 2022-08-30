import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { netChapterList } from "../../../apis/Player";
import { RootState } from "../../../store";
import { netDramaVideo, netNoDramaVideo } from "../../../apis/Theater";
import { setAutoAdd } from "../../../store/modules/player.module";
import { EBookFinishStatus, EIsRead } from "../../../interfaces/player.interface";
import ChapterListLog from "./ChapterListLog";
const ImgHeartWhite = require('../../../assets/images/heart-white.png')
const ImgHeartActive = require('../../../assets/images/heart-active-icon.png')
const ImgPlayerCatalog = require('../../../assets/images/player/player-catalog.png')

interface IProps {

}

const ControlMore = (props: IProps) => {
  const dispatch = useDispatch()
  const [isShowChapters, setIsShowChapters] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [chapters, setChapters] = useState([]);
  const [bookFinishStatus, setBookFinishStatus] = useState<EBookFinishStatus>(0);
  const [total, setTotal] = useState(0);
  const { bookId, chapterId, chapterInfo, bookName, autoAdd } = useSelector((state: RootState) => (state.player));
  useEffect(() => {
    if (bookId) {
      // getChapterList().then()
    }
  }, [bookId]);

  const getChapterList = async (tab: number) => {
    const { chapterList = [], totalChapters = '0', bookFinishStatus } = await netChapterList({
      bookId,
      startIndex: tab * 30 + 1,
      endIndex: (tab + 1) * 30
    });
    setChapters(chapterList);
    setTotal(Number(totalChapters));
    setBookFinishStatus(bookFinishStatus)
  }

  const dramaVideo = async () => {
    if (autoAdd === EIsRead.不是) {
      await netDramaVideo(bookId, '在看页')
      dispatch(setAutoAdd(EIsRead.是))
    } else {
      await netNoDramaVideo(bookId, '在看页')
      dispatch(setAutoAdd(EIsRead.不是))
    }
  }
  const checkChapterList = async () => {
    setIsShowChapters(true);
    await getChapterList(tabIndex)
  }

  const chooseTab = async (index: number) => {
    setTabIndex(index);
    await getChapterList(index)
  }
  return <View style={styles.moreWrap}>
    <ChapterListLog
      bookFinishStatus={bookFinishStatus}
      tabIndex={tabIndex}
      modalVisible={isShowChapters}
      chapterList={chapters}
      total={total}
      chooseTab={chooseTab}
      close={() => setIsShowChapters(false)}/>
    <View style={styles.moreLeft}>
      <Text style={styles.bookName}>{bookName}</Text>
      <Text style={styles.chapterName}>{chapterInfo.chapterName}</Text>
    </View>
    <TouchableWithoutFeedback onPressIn={() => dramaVideo()}>
      <View style={styles.moreDrama}>
        <Image style={styles.moreIcon} source={autoAdd === EIsRead.不是 ? ImgHeartWhite : ImgHeartActive}/>
        <Text style={styles.chapterName}>{autoAdd === EIsRead.不是 ? '追剧' : '已追剧'}</Text>
      </View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPressIn={() => checkChapterList()}>
      <View style={styles.moreDrama}>
        <Image style={styles.moreIcon} source={ImgPlayerCatalog}/>
        <Text style={styles.chapterName}>选集</Text>
      </View>
    </TouchableWithoutFeedback>
  </View>
}

const styles = StyleSheet.create({
  moreWrap: {
    display: "flex",
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },
  moreLeft: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  moreDrama: {
    width: 58,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreIcon: {
    width: 20,
    height: 20,
  },
  bookName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 19,
  },
  chapterName: {
    marginTop: 5,
    fontSize: 14,
    color: '#FFFFFF',
  }
})

export default ControlMore;
