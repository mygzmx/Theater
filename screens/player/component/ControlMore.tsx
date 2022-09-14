import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { useToast } from "react-native-toast-notifications";
import { RootState } from "../../../store";
import { netDramaVideo } from "../../../apis/Theater";
import { setIsInBookShelf } from "../../../store/modules/player.module";
import { EScene } from "../../../interfaces/player.interface";
import { IVideoList } from "../Player";
import { setCancelDramaVisible, setChapterListVisible } from "../../../store/modules/control.module";
const ImgHeartWhite = require('../../../assets/images/heart-white.png')
const ImgHeartActive = require('../../../assets/images/heart-active-icon.png')
const ImgPlayerCatalog = require('../../../assets/images/player/player-catalog.png')

interface IProps {
  source: IVideoList;
}

const ControlMore = (props: IProps) => {
  const toast = useToast();
  const dispatch = useDispatch()
  const { bookId, videoSource } = useSelector((state: RootState) => (state.player));

  const dramaVideo = async () => {
    if (!videoSource?.isInBookShelf) {
      await netDramaVideo(bookId, EScene.播放页)
      toast.show('追剧成功，可在剧场查看我的追剧');
      dispatch(setIsInBookShelf(true))
    } else {
      dispatch(setCancelDramaVisible(true))
    }
  }

  const checkChapterList = async () => {
    dispatch(setChapterListVisible(true));
  }

  return <View style={styles.moreWrap}>

    <View style={styles.moreLeft}>
      <Text style={styles.bookName}>{ videoSource?.bookName }</Text>
      <Text style={styles.chapterName}>{ props.source.chapterName }</Text>
    </View>
    <Pressable style={styles.moreDrama} onPressIn={() => dramaVideo()}>
      <Image style={styles.moreIcon} source={ videoSource?.isInBookShelf ? ImgHeartActive : ImgHeartWhite }/>
      <Text style={styles.chapterName}>{ videoSource?.isInBookShelf ? '已追剧' : '追剧'}</Text>
    </Pressable>
    <Pressable style={styles.moreDrama} onPress={() => checkChapterList()}>
      <Image style={styles.moreIcon} source={ImgPlayerCatalog}/>
      <Text style={styles.chapterName}>选集</Text>
    </Pressable>
  </View>
}

const styles = StyleSheet.create({
  moreWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },
  moreLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  moreDrama: {
    width: 58,
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
