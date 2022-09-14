import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
const MoreIcon = require('../../../assets/images/more-icon.png')
const RecordIcon = require('../../../assets/images/self/record-icon.png')
const TaskIcon = require('../../../assets/images/self/task-icon.png')
const AboutusIcon = require('../../../assets/images/self/aboutus-icon.png')
const SettingIcon = require('../../../assets/images/self/setting-icon.png')
const CustomerIcon = require('../../../assets/images/self/customer-icon.png')

export interface ILinkItem {
  label: string;
  icon: any;
  uri: string;
}

interface IProps {
  linkTo: (item: ILinkItem) => void;
  zhichi: boolean
}

export default function SelfLink({ linkTo, zhichi }: IProps) {

  const linkData = [
    { label: '观看记录', icon: RecordIcon, uri: 'ViewingRecords' },
    { label: '任务和签到', icon: TaskIcon, uri: 'TaskCheckIn' },
    { label: '关于我们', icon: AboutusIcon, uri: 'AboutUs' },
    { label: '设置', icon: SettingIcon, uri: 'Setting' },
    // 客服链接后端返回 zhiChiUrl
    { label: '联系客服', icon: CustomerIcon, uri: '' },
  ]

  const renderItem = ({ item }: {item: ILinkItem}) => {
    if (item.label === '联系客服' && !zhichi) {
      return null;
    }
    return <Pressable key={item.label} style={styles.linkItem} onPress={() => linkTo(item)}>
      <View style={styles.linkItemLeft}>
        <Image style={styles.linkItemLeftImg} source={item.icon}/>
        <Text style={styles.linkItemLeftTxt}>{item.label}</Text>
      </View>
      <Image style={styles.linkItemRight} source={MoreIcon}/>
    </Pressable>;
  }
  return <FlatList
    style={styles.linkBox}
    data={linkData}
    renderItem={renderItem}
    keyExtractor={item => item.label} />
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  linkBox: {
    position: 'absolute',
    top: 260,
    width,
    height: height - 300,
  },
  linkItem: {
    width,
    paddingRight: 20,
    paddingLeft: 20,
    height: 57,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkItemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkItemLeftImg: {
    width: 20,
    height: 20,
  },
  linkItemLeftTxt: {
    marginLeft: 10,
    fontSize: 15,
    color: '#222222',
  },
  linkItemRight: {
    width: 10,
    height: 10,
  },
})
