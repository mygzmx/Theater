import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { useState, useEffect } from "react";
import { RootStackScreenProps } from "../../@types";
import { netWallet } from "../../apis/Self";
const ImgOrder = require('../../assets/images/self/order.png');
const ImgAspect = require('../../assets/images/self/aspect-change.png');
const ImgUnlock = require('../../assets/images/self/unlock.png');
const ImgMore = require('../../assets/images/more-about.png');

export default function Wallet ({ navigation }: RootStackScreenProps<'Wallet'>) {
  const [amount, setAmount] = useState(0);
  const [award, setAward] = useState(0);
  const [expireText, setExpireText] = useState('');
  const recordList = [
    { id: '1', label: '充值订单记录', beforeIcon: ImgOrder, uri: 'RecordOrder' },
    { id: '2', label: '看点变更记录', beforeIcon: ImgAspect, uri: 'AspectChange' },
    { id: '3', label: '已解锁剧集', beforeIcon: ImgUnlock, uri: 'Unlock' }];

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    const { amount = 0, award = 0, expireText = '' } = await netWallet();
    setAmount(amount);
    setAward(award);
    setExpireText(expireText);
  }

  const toLinkPay = () => {
    // Recharge
  }

  const toLink = (val: { label: string; uri: string }) => {
    // @ts-ignore
    navigation.push(val.uri)
  }

  return <View style={styles.walletWrap}>
    <View style={styles.walletHeader}>
      <View style={styles.aspect}>
        <View style={styles.aspectItem}>
          <Text style={styles.aspectItemNum}>{amount}</Text>
          <Text style={styles.aspectItemTxt}>充值看点</Text>
        </View>
        <View style={styles.aspectItemLine}/>
        <View style={styles.aspectItem}>
          <Text style={styles.aspectItemNum}>{award}</Text>
          <Text style={styles.aspectItemTxt}>赠送看点</Text>
        </View>
      </View>
      <Pressable style={styles.recharge} onPress={toLinkPay}>
        <Text style={styles.rechargeTxt}>充值</Text>
      </Pressable>
      { expireText && <Text style={styles.rechargeIntro} >{ expireText }</Text> }
    </View>
    <View style={styles.walletRecord}>
      { recordList.map((val, ind) => (
        <Pressable key={val.id} style={[styles.recordItem, { borderBottomWidth: ind === recordList.length - 1 ? 0 : 1 }]} onPress={() => toLink(val)}>
          <Image style={styles.recordItemBefore} source={val.beforeIcon}/>
          <Text style={styles.recordItemTxt}>{val.label}</Text>
          <Image style={styles.recordItemMore} source={ImgMore}/>
        </Pressable>
      ))}
    </View>

  </View>
}
const styles = StyleSheet.create({
  walletWrap: {
    padding: 15,
    backgroundColor: 'rgba(243, 245, 249, 1)',
  },
  walletHeader: {
    width: '100%',
    padding: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 12,
  },
  aspect: {
    height: 65,
    paddingLeft: 33,
    paddingRight: 33,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  aspectItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  aspectItemNum: {
    height: 43,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#191919',
  },
  aspectItemTxt: {
    marginTop: 4,
    fontSize: 14,
    color: '#9E9E9E',
  },
  aspectItemLine: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(229, 230, 235, 1)',
  },

  recharge: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4B00',
    marginTop: 24,
    marginBottom: 12,
    height: 44,
    borderRadius: 22,
  },
  rechargeTxt: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  rechargeIntro: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  walletRecord: {
    width: '100%',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(229, 230, 235, 1)',
    borderStyle: 'solid',
  },
  recordItemMore: {
    width: 14,
    height: 14,
  },
  recordItemBefore: {
    width: 16,
    height: 16,
  },
  recordItemTxt: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#404657',
  },
})
