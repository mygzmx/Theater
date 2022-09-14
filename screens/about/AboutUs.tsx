import { StyleSheet, View, Image, Text, Pressable, Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { AGREEMENT_H5 } from "../../utils/const";
import { RootStackScreenProps } from "../../@types";
const ImgLogo = require('../../assets/images/logo.png');
const ImgMore = require('../../assets/images/more-about.png');

interface IPageData {
  label: string;
  content?: string;
  uri?: string;
  icon?: any;
}

export default function AboutUs ({ navigation }: RootStackScreenProps<'AboutUs'>) {
  const pageData: IPageData[] = [
    { label: "联系客服", content: '400-118-0066' },
    { label: "意见反馈", icon: ImgMore, uri: '' },
    { label: "用户协议", icon: ImgMore, uri: AGREEMENT_H5.USER },
    { label: "隐私政策", icon: ImgMore, uri: AGREEMENT_H5.PRIVACY },
    { label: "会员服务协议", icon: ImgMore, uri: AGREEMENT_H5.VIP },
  ];

  const linkTo = ({ label, uri }: IPageData) => {
    if (label === '联系客服') {
      Linking.openURL('tel:4001180066').then(() => {})
    } else if (label === '意见反馈') {
      navigation.navigate('FeedBack')
    }else {
      uri && WebBrowser.openBrowserAsync(uri)
    }
  }
  return <View style={styles.aboutWarp}>
    <View style={styles.aboutLogo}>
      <Image style={styles.aboutLogoImg} source={ImgLogo}/>
      <Text style={styles.aboutLogoTxt}>繁花剧场</Text>
    </View>
    { pageData.map(val => {
      return <Pressable style={styles.aboutItem} key={val.label} onPress={() => linkTo(val)}>
        <Text style={styles.title}>{val.label}</Text>
        { val.content ? <Text style={styles.content}>{val.content}</Text> : <Image style={styles.icon} source={val.icon}/>}
      </Pressable>
    }) }
  </View>
}

const styles = StyleSheet.create({
  aboutWarp: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  aboutLogo: {
    paddingTop: 34,
    paddingBottom: 39,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutLogoImg: {
    width: 80,
    height: 80,
    borderRadius: 18,
  },
  aboutLogoTxt: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#191919',
  },
  aboutItem: {
    width: '100%',
    height: 68,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E5E6EB',
  },
  title: {
    fontSize: 16,
    color: '#191919',
  },
  icon: {
    width: 15,
    height: 15,
  },
  content: {
    padding: 5,
    fontSize: 16,
    color: '#191919',
  },
})
