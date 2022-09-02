import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { useState } from "react";
import { EIsSign, ESignRecordType, ISignRecordVos } from "../../../interfaces/self.interface";
import { netCheckIn } from "../../../apis/Self";
import SuccessCheckin from "./SuccessCheckin";
import RuleCheckin from "./RuleCheckin";
const ImgMiddleLine = require('../../../assets/images/self/line.png');
const ImgRuleBg = require('../../../assets/images/self/rule-bg.png');
const ImgCoinBg1 = require('../../../assets/images/self/coin-bg.png')
const ImgCoinBg2 = require('../../../assets/images/self/coin-bg2.png')
const ImgCoin1 = require('../../../assets/images/self/coin.png')
const ImgCoin2 = require('../../../assets/images/self/coin2.png')
const ImgBtn1 = require('../../../assets/images/self/btn-bg.png');
const ImgBtn2 = require('../../../assets/images/self/btn-bg2.png');
interface IProps {
  isSign: EIsSign;
  signRecordVos: ISignRecordVos[],
  continueDay: number;
  signText: string;
  refresh: () => void;
}

export default function Checkin ({ signText, continueDay, signRecordVos, isSign, refresh }: IProps) {

  const [checkInVisible, setCheckInVisible] = useState(false);
  const [award, setAward] = useState(0);
  const [awardVal, setAwardVal] = useState(0);
  const [ruleVisible, setRuleVisible] = useState(false);

  const checkIn = async () => {
    const { awardNum = 0, awardValidity = 0 } = await netCheckIn();
    setCheckInVisible(true);
    setAward(awardNum);
    setAwardVal(awardValidity);
    refresh()
  }

  return <View style={styles.checkinWrap}>
    <SuccessCheckin visible={checkInVisible} message={`已获得${award}看点,有效期为${awardVal}天`} close={() => setCheckInVisible(false)}/>
    <RuleCheckin visible={ruleVisible} signText={signText} close={() => setRuleVisible(false)}/>
    <View style={styles.checkinTitle}>
      <View style={styles.checkinTitle2}>
        <Text style={styles.checkinTitleTxt1}>签到任务</Text>
        <Text style={styles.checkinTitleTxt2}>领取看点免费看</Text>
      </View>
      { signText && <TouchableWithoutFeedback onPress={() => setRuleVisible(true)}>
        <ImageBackground style={styles.checkinRule} source={ImgRuleBg}>
          <Text style={styles.checkinRuleTxt}>规则</Text>
        </ImageBackground>
      </TouchableWithoutFeedback>  }
    </View>
    <Image style={styles.middleLine} source={ImgMiddleLine} />
    <View style={styles.signboard}>
      <View style={styles.signItemBox}>
        { signRecordVos.map(val => {
          const isToday = (isSign === 1 && continueDay === val.day) || (isSign !== 1 && continueDay + 1 === val.day);
          return <View key={val.day} >
            <ImageBackground source={val.isSign === EIsSign.已签到 ? ImgCoinBg2 : ImgCoinBg1 } style={ styles.signItemTip }>
              { val.type === ESignRecordType.书币 && <>
                <Image style={styles.signItemIcon} source={val.isSign === EIsSign.已签到 ? ImgCoin2 : ImgCoin1}/>
                <Text style={{ ...styles.signItemTxt, color: val.isSign === EIsSign.已签到 ? '#ff9c5d' : '#ffffff' }}>{ `+${val.num}` }</Text>
              </> }
            </ImageBackground>
            <View style={{ ...styles.signItemDayBox, backgroundColor: isToday ? '#fdede5' : '#FFFFFF', }}>
              <Text style={{ ...styles.signItemDay, color: isToday ? '#ff4b00' : '#848c9f' }}>
                { isToday ? '今' : val.day}天
              </Text>
            </View>
          </View>
        })}
      </View>
      <TouchableWithoutFeedback onPress={() => isSign === EIsSign.无 && checkIn()}>
        <ImageBackground resizeMode={"contain"} style={styles.checkinBtn} source={isSign === EIsSign.无 ? ImgBtn1 : ImgBtn2}>
          <Text style={styles.checkinBtnTxt}>{ isSign === EIsSign.无 ? '签到' : '已签到' }</Text>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  </View>
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  checkinWrap: {
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
  checkinRule: {
    width: 44,
    height: 22,
    borderTopStartRadius: 11,
    borderBottomLeftRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkinRuleTxt: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  middleLine: {
    position: 'relative',
    top: -2,
    height: 1,
    width: width - 64,
    marginLeft: 12,
  },
  signboard: {
    position: 'relative',
    top: -2,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    width: '100%',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 18,
    paddingBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  signItemBox: {
    flexShrink: 0,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  signItemTip: {
    width: 38,
    height: 53,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: '#ffae74',
    // borderRadius: 7,
    paddingTop: 6,
    alignItems: 'center',
  },
  signItemIcon: {
    width: 23,
    height: 23,
  },
  signItemTxt: {
    textAlign: 'center',
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  signItemDayBox: {
    marginTop: 4,
    borderRadius: 8,
  },
  signItemDay: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 1,
    paddingBottom: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  checkinBtn: {
    marginTop: 17,
    width: 275,
    height: 55,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkinBtnTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  }
})
