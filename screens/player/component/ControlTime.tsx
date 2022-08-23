import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

interface IProps {
  durationMillis?: number;
  positionMillis?: number;
}

export const ControlTime = ({ durationMillis = 0, positionMillis = 0 }: IProps) => {
  const [total, setTotal] = useState('00:00');
  const [posi, setPosi] = useState('00:00');

  useEffect(() => {
    setPosi(secondString(positionMillis / 1000))
  }, [positionMillis]);

  useEffect(() => {
    setTotal(secondString(durationMillis / 1000));
  }, [durationMillis]);

  const secondString = (second: number): string => {
    let newSecond = Number(second.toFixed(0))
    const minu = Math.floor(newSecond / 60)
    const _minu = minu > 9 ? '' + minu : '0' + minu
    newSecond = newSecond % 60
    const _second = newSecond > 9 ? '' + newSecond : '0' + newSecond
    return `${_minu}:${_second}`
  }

  return <View style={styles.timeBox}>
    <Text style={[styles.indexTextStyle]}>{posi}</Text>
    <View style={styles.indexIdo}/>
    <Text style={[styles.indexTextStyle]}>{total}</Text>
  </View>;
};

const styles = StyleSheet.create({
  timeBox: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  indexIdo: {
    height: 12,
    width: 2,
    backgroundColor: '#FFFFFF',
    marginLeft: 8,
    marginRight: 8,
  },
  indexTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
})