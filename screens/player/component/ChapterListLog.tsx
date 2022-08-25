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
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface IProps {
  modalVisible: boolean;
  close: () => void;
  chapterList: any[];
}

const ImgClose = require('../../../assets/images/player/catalog-close.png')

export default function ChapterListLog ({modalVisible, close, chapterList}: IProps) {

  const { bookId, chapterId, chapterInfo, bookName, autoAdd } = useSelector((state: RootState) => (state.player));

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
          { bookName && <Text style={styles.logTitleTxt} numberOfLines={1} ellipsizeMode={'tail'}>{bookName}</Text>}
          <View style={styles.logTitleIcon}>
            <Text style={styles.logTitleIconTxt}>{true ? '已完结':'更新中'}</Text>
          </View>
        </View>

        <View style={styles.chapterListBox}>
          {chapterList.map(chapter => (
            <View style={styles.chapterItem}>
              <Text>{chapter.chapterIndex}</Text>
            </View>
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
    paddingTop: 20,
    paddingLeft: 14,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: height/2,
    backgroundColor: 'rgba(255,255,255,0.9)',
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
  chapterNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#404657',
  }
})
