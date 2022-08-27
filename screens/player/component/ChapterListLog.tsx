import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, TouchableWithoutFeedback
} from "react-native";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setChapterId } from "../../../store/modules/player.module";
import { FlatList } from "react-native";
import { EBookFinishStatus, EIsCharge } from "../../../interfaces/player.interface";

interface IProps {
  modalVisible: boolean;
  total: number;
  close: () => void;
  chapterList: any[];
  chooseTab: (index: number) => void;
  tabIndex: number;
  bookFinishStatus: EBookFinishStatus;
}

const ImgClose = require('../../../assets/images/player/catalog-close.png');
const ImgCatalogLock = require('../../../assets/images/player/catalog-lock.png');
const ImgCatalogVip = require('../../../assets/images/player/catalog-vip.png');
const ImgCatalogUnlock = require('../../../assets/images/player//catalog-unlock.png');

const ImgEIsCharge = {
  [EIsCharge.收费]: ImgCatalogLock,
  [EIsCharge.vip免费]: ImgCatalogVip,
  [EIsCharge.收费已购买]: ImgCatalogUnlock,
}

export default function ChapterListLog ({modalVisible, close, chapterList, total, tabIndex, chooseTab, bookFinishStatus}: IProps) {

  const { bookId, chapterId, chapterInfo, bookName, autoAdd } = useSelector((state: RootState) => (state.player));

  const dispatch = useDispatch()

  const chooseChapter = (chapter: any) => {
    dispatch(setChapterId(chapter.chapterId));
  }

  const getTabs = (interval: number = 30): string[] => {
    if (total <= interval) {
      return [`1-${total}`];
    } else {
      const length =  Math.ceil(total / interval);
      const remainder = total % interval;
      return Array.from({ length }, (v, i) => {
        if (i + 1 === length) {
          if (remainder !== 1) {
            return `${i * interval + 1}-${i * interval + remainder}`
          }
          return `${i * interval + 1}`
        }
        return `${i * interval + 1}-${(i + 1) * 30}`
      })
    }
  }

  return <Modal
    animationType="slide"
    transparent={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}
    visible={modalVisible}>
    <View style={styles.chapterLog}>
      <TouchableWithoutFeedback onPressIn={() => close() }>
        <View style={styles.chapterLogMask}/>
      </TouchableWithoutFeedback>
      <View style={styles.chapterLogContent}>
        <TouchableOpacity style={styles.chapterClose} onPressIn={() => close() }>
          <Image style={styles.chapterCloseImg} source={ImgClose}/>
        </TouchableOpacity>
        <View style={styles.logTitleBox}>
          { !!bookName && <Text style={styles.logTitleTxt} numberOfLines={1} ellipsizeMode={'tail'}>{bookName}</Text>}
          { !!bookFinishStatus && <View style={styles.logTitleIcon}>
            <Text style={styles.logTitleIconTxt}>
              { bookFinishStatus === EBookFinishStatus.已完结 ? '已完结' : '更新中' }
            </Text>
          </View>}
        </View>
        <FlatList
          style={styles.tabBox}
          ItemSeparatorComponent={() => <View style={styles.tabIntervalBox}><View style={styles.tabInterval} /></View>}
          horizontal
          data={getTabs(30)}
          renderItem={({ item, index }: {item: string, index: number}) => (
            <TouchableOpacity style={styles.tabItem} onPressIn={() => chooseTab(index)}>
              <Text style={{ ...styles.tabItemTxt, fontWeight: tabIndex === index ?  '800' : '400' }}>{item}</Text>
            </TouchableOpacity>)}
          keyExtractor={item => item} />
        <View style={styles.chapterListBox}>
          {chapterList.map(chapter => (
            <TouchableOpacity
              key={chapter.chapterId}
              onPressIn={() => chooseChapter(chapter)}
              style={{ ...styles.chapterItem,
                backgroundColor: chapter.chapterId === chapterId ? 'rgba(255, 75, 0, 1)' : 'rgb(226,227,229)' }}>
              { chapter.isCharge !== EIsCharge.免费 &&  <Image style={styles.chapterItemIcon} source={ImgEIsCharge[chapter.isCharge]}/> }
              <Text style={{
                ...styles.chapterNumber,
                color: chapter.chapterId === chapterId ? '#FFFFFF' : "#404657",
                fontWeight: chapter.chapterId === chapterId ? '900' : '500'
              }}>{chapter.chapterIndex}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  </Modal>
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  chapterLog: {
    width,
    height,
    display: 'flex',
  },
  chapterLogMask: {
    flex: 1,
  },
  chapterLogContent: {
    position: "relative",
    width,
    paddingTop: 24,
    paddingLeft: 14,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: height/2,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  chapterClose: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  chapterCloseImg: {
    width: 25,
    height: 25,
  },
  logTitleBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  logTitleTxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#191919',
  },
  logTitleIcon: {
    height: 20,
    lineHeight: 20,
    borderRadius: 10,
    width: 55,
    backgroundColor: 'rgba(118, 185, 115, 1)',
    marginLeft: 8,
  },
  logTitleIconTxt: {
    height: 20,
    lineHeight: 20,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 13,
  },
  tabBox: {
    flexGrow: 0,
  },
  tabItem: {
    width: 45,
    height: 57,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItemTxt: {
    fontSize: 14,
    color: '#404657',
  },
  tabIntervalBox: {
    width: 1,
    height: 57,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tabInterval: {
    width: 1,
    backgroundColor: 'rgba(201, 205, 212, 1)',
    height: 12,
  },
  chapterListBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chapterItem: {
    width: (width - 100) / 6,
    height: (width - 100) / 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: 'rgba(242, 243, 245, 1)',
    margin: 6
  },
  chapterItemIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 14,
    height: 14,
  },
  chapterNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#404657',
  }
})
