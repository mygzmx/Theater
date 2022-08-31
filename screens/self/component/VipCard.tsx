import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Button
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { IUserInfo } from "../../../interfaces/self.interface";
const ImgMoreIcon = require('../../../assets/images/more-icon.png')
const ImgVipTitle = require('../../../assets/images/self/vip-title.png')

interface IProps extends IUserInfo {
  amount: number;
}

export default function VipCard (props: IProps) {
  const navigation = useNavigation()
  const routerToAc = () => {
    // navigation.navigate('Wallet')
  }
  const linkPay = () => {

  }
  const linkRecharge = () => {
    // navigation.navigate('Recharge')
  }

  return (<ImageBackground
    source={{ uri: props.vip ? 'https://fvimg.kkyd.cn/images/vip-card.png' : 'https://fvimg.kkyd.cn/images/vip-card2.png' }}
    style={styles.vipCard}>
    <TouchableWithoutFeedback onPress={linkRecharge}>
      <View style={styles.top}>
        <Image style={styles.topImg} source={ImgVipTitle}/>
        <Text style={{ ...styles.topExpire, color: props.vip ? '#C9651A' : '#7F7F7F' }}>
          { props.vipExpiryTime ?
            (props.vip ? `${dayjs(props.vipExpiryTime, 'YYYY-MM-DD')}到期` : `${dayjs(props.vipExpiryTime, 'YYYY-MM-DD')}已过期`)
            : '未开通'
          }
        </Text>
      </View>
    </TouchableWithoutFeedback>
    <View style={styles.accountBalance}>
      <View style={styles.accountBalanceLeft}>
        <Text style={styles.accountBalanceLeftTitle}>账户余额：</Text>
        <View style={styles.accountBalanceLeftCountBox}>
          <Text style={styles.accountBalanceLeftCount}>{ props.amount }</Text>
          <Text style={{ ...styles.accountBalanceLeftCount, fontSize: 14, marginBottom: 2, marginLeft: 5 }} >看点</Text>
        </View>
      </View>
      <View style={styles.accountBalanceRight}>
        <TouchableWithoutFeedback onPress={routerToAc} >
          <View style={styles.accountBalanceRightLink}>
            <Text style={styles.accountBalanceRightLinkTxt}>查看详情</Text>
            <Image style={styles.accountBalanceRightLinkImg} source={ImgMoreIcon} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={linkPay}>
          <View style={styles.accountBalanceRightPay}>
            <Text style={styles.accountBalanceRightPayTxt}>充值</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  </ImageBackground>)
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  vipCard: {
    position: 'absolute',
    top: 100,
    width,
    height: 178,
    paddingTop: 16,
    paddingLeft: 40,
    paddingRight: 40,
  },
  top: {
    paddingBottom: 30,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  topImg: {
    width: 67,
    height: 18,
  },
  topExpire: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  accountBalance: {
    width: '100%',
    display: "flex",
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  accountBalanceLeft: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  accountBalanceLeftTitle: {
    fontSize: 13,
    color: '#222222',
  },
  accountBalanceLeftCountBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 18
  },
  accountBalanceLeftCount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222222',
  },

  accountBalanceRight: {
    width: 72,
  },
  accountBalanceRightLink: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 35,
    paddingBottom: 15,
  },
  accountBalanceRightLinkTxt: {
    fontSize: 13,
    color: '#7F7F7F',
  },
  accountBalanceRightLinkImg: {
    width: 10,
    height: 10,
  },
  accountBalanceRightPay: {
    height: 28,
    backgroundColor: '#FF4B00',
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountBalanceRightPayTxt: {
    fontSize: 16,
    color: '#FFFFFF',
  },
})
