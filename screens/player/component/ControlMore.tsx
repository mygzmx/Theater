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
import { useToast } from "react-native-toast-notifications";
import { netChapterList } from "../../../apis/Player";
import { RootState } from "../../../store";
import { netDramaVideo, netNoDramaVideo } from "../../../apis/Theater";
import { setIsInBookShelf, setChapterId } from "../../../store/modules/player.module";
import { EBookFinishStatus, EScene, IChapterListItem } from "../../../interfaces/player.interface";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { IVideoList } from "../Player";
import ChapterListLog from "./ChapterListLog";
const ImgHeartWhite = require('../../../assets/images/heart-white.png')
const ImgHeartActive = require('../../../assets/images/heart-active-icon.png')
const ImgPlayerCatalog = require('../../../assets/images/player/player-catalog.png')

interface IProps {
  source: IVideoList;
}

const ControlMore = (props: IProps) => {
  const toast = useToast();
  const dispatch = useDispatch()
  const [isShowChapters, setIsShowChapters] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [chapters, setChapters] = useState<IChapterListItem[]>([]);
  const [bookFinishStatus, setBookFinishStatus] = useState<EBookFinishStatus>(0);
  const [total, setTotal] = useState(0);
  const { bookId, videoSource } = useSelector((state: RootState) => (state.player));
  const [confirmVisible, setConfirmVisible] = useState(false);
  useEffect(() => {
    if (bookId) {
      getChapterList(0).then(() => {})
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
    if (!videoSource?.isInBookShelf) {
      await netDramaVideo(bookId, EScene.播放页)
      toast.show('追剧成功，可在剧场查看我的追剧');
      dispatch(setIsInBookShelf(true))
    } else {
      setConfirmVisible(true);
    }
  }
  const confirm = async () => {
    dispatch(setIsInBookShelf(false))
    setConfirmVisible(false)
    await netNoDramaVideo(bookId, EScene.播放页)
  }

  const checkChapterList = async () => {
    setIsShowChapters(true);
    await getChapterList(tabIndex)
  }

  const chooseTab = async (index: number) => {
    if (tabIndex === index) return;
    setTabIndex(index);
    await getChapterList(index)
  }
  const chooseChapter = (chapter: any) => {
    dispatch(setChapterId(chapter.chapterId));
    setIsShowChapters(false);
  }

  return <View style={styles.moreWrap}>
    <ConfirmDialog
      visible={confirmVisible}
      rightBtn={() => setConfirmVisible(false)}
      leftBtn={() => confirm()}
      close={() => setConfirmVisible(false)}
      leftTxt="确认"
      rightTxt="再想想"
      title="确认取消追剧吗？"
      message="取消后您将无法快速找到本剧"/>
    <ChapterListLog
      chapterId={ props.source.chapterId }
      bookFinishStatus={bookFinishStatus}
      tabIndex={tabIndex}
      modalVisible={isShowChapters}
      chapterList={chapters}
      total={total}
      chooseTab={chooseTab}
      chooseChapter={chooseChapter}
      close={() => setIsShowChapters(false)}/>
    <View style={styles.moreLeft}>
      <Text style={styles.bookName}>{ videoSource?.bookName }</Text>
      <Text style={styles.chapterName}>{ props.source.chapterName }</Text>
    </View>
    <TouchableWithoutFeedback onPressIn={() => dramaVideo()}>
      <View style={styles.moreDrama}>
        <Image style={styles.moreIcon} source={ videoSource?.isInBookShelf ? ImgHeartActive : ImgHeartWhite }/>
        <Text style={styles.chapterName}>{ videoSource?.isInBookShelf ? '已追剧' : '追剧'}</Text>
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
