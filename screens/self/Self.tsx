import { StyleSheet } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View } from '../../components/Themed';
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { EIsZhichi } from "../../interfaces/self.interface";
import { RootStackParamList, RootTabScreenProps } from "../../@types";
import { userInfoAsync } from "../../store/modules/user.module";
import SelfHeader from "./component/SelfHeader";
import VipCard from "./component/VipCard";
import SelfLink, { ILinkItem } from "./component/SelfLink";

export default function Self ({ navigation }: RootTabScreenProps<'Self'>) {
  const { user, amount = 0, award = 0, zhiChiUrl, isZhichi } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(userInfoAsync());
      return () => {
        // console.log('============隐藏');
      };
    }, []),
  );

  // 登录
  const handleLogin = () => {
    navigation.push('Login');
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
    navigation.navigate('Wallet')
  }
  const linkPay = () => {

  }
  const linkRecharge = () => {
    // navigation.navigate('Recharge')
  }
  return (
    <View style={styles.container}>
      <SelfHeader {...user} handleLogin={handleLogin}/>
      <VipCard {...user} amount={amount + award} routerToAc={routerToAc} linkPay={ linkPay} linkRecharge={linkRecharge}/>
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
