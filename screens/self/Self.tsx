import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { Text, View } from '../../components/Themed';
import { RootState, useAppSelector } from "../../store";
import SelfHeader from "./component/SelfHeader";
import VipCard from "./component/VipCard";
import SelfLink from "./component/SelfLink";

export default function Self () {
  const { user, amount } = useAppSelector((state: RootState) => state.user)
  // 登录
  const handleLogin = () => {

  }
  return (
    <View style={styles.container}>
      <SelfHeader {...user} handleLogin={handleLogin}/>
      <VipCard {...user} amount={amount}/>
      <SelfLink/>
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
  },

});
