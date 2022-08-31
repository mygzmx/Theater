import { StyleSheet } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import { View } from '../../components/Themed';
import { RootState, useAppSelector } from "../../store";
import { EIsZhichi } from "../../interfaces/self.interface";
import { RootStackParamList } from "../../@types";
import SelfHeader from "./component/SelfHeader";
import VipCard from "./component/VipCard";
import SelfLink, { ILinkItem } from "./component/SelfLink";


export default function Self () {
  const { user, amount, zhiChiUrl, isZhichi } = useAppSelector((state: RootState) => state.user)
  const navigation = useNavigation()
  // 登录
  const handleLogin = () => {

  }

  const linkTo = (item: ILinkItem) => {
    if (item.label === '联系客服') {
      WebBrowser.openBrowserAsync(zhiChiUrl).then(r => {});
    } else {
      const uri = item.uri as keyof RootStackParamList
      navigation.navigate(uri);
    }
  }

  const routerToAc = () => {
    // navigation.navigate('Wallet')
  }
  const linkPay = () => {

  }
  const linkRecharge = () => {
    // navigation.navigate('Recharge')
  }
  return (
    <View style={styles.container}>
      <SelfHeader {...user} handleLogin={handleLogin}/>
      <VipCard {...user} amount={amount} routerToAc={routerToAc} linkPay={ linkPay} linkRecharge={linkRecharge}/>
      <SelfLink linkTo={linkTo} zhichi={ !!(isZhichi === EIsZhichi.开 && zhiChiUrl) }/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  }
});
