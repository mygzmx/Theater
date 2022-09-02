import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { Link, useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
const ImgMoreAbout = require('../../assets/images/more-about.png');

export default function Setting () {
  const toast = useToast()
  const navigation = useNavigation()
  const [apiChangeCount, setApiChangeCount] = useState(0);
  const [fileList, setFileList] = useState([]);
  const versionName = '1.0.0';
  useFocusEffect(
    useCallback(() => {
      setApiChangeCount(0)
      return () => {
        setApiChangeCount(0)
      };
    }, []),
  );
  return <View style={styles.settingWrap}>
    <Pressable style={styles.settingItem} onPress={() => setApiChangeCount(pre => pre + 1)}>
      <Text style={styles.settingItemLabel}>当前版本</Text>
      <Text style={styles.settingItemRightTxt}>{versionName}</Text>
    </Pressable>
    <View style={styles.settingItem}>
      <Text style={styles.settingItemLabel}>清除缓存</Text>
      { fileList.length > 0 ? <Pressable style={styles.clearItemRight} onPress={() => setApiChangeCount(pre => pre + 1)}>
        <Text style={styles.clearItemRightTxt}>清除</Text>
      </Pressable> : <Text>0MB</Text>}
    </View>
    <Link to={'AutoOrder'} style={styles.settingItem} onPress={() => setApiChangeCount(pre => pre + 1)}>
      <Text style={styles.settingItemLabel}>自动解锁管理</Text>
      <Image style={styles.settingItemMore} source={ImgMoreAbout}/>
    </Link>
  </View>
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  settingWrap: {
    backgroundColor: '#F3F5F9',
    minHeight: height,
  },
  settingItem: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  settingItemLabel: {
    fontSize: 16,
    color: '#191919',
  },

  settingItemRightTxt: {
    fontSize: 16,
    color: '#444444',
  },
  clearItemRight: {
    width: 68,
    height: 30,
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FF4B00',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 9,
  },
  clearItemRightTxt: {
    fontSize: 14,
    color: '#FF4B00',
  },
  settingItemMore: {
    width: 15,
    height: 15,
  }
})
