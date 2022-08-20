import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { AVPlaybackStatus } from "expo-av";

const ImgPlay = require("../../../assets/images/player/player-play.png")
interface IProps {
  statusData: AVPlaybackStatus;
  onAction: () => void;
}

export default function Controls ({ statusData, onAction }: IProps) {

  const StopArea = () => (
    <View style={styles.stopIcon}>
      {!(statusData.isLoaded && statusData.isPlaying) &&
          <Image source={ImgPlay} style={{ width: 70, height: 70 }}/>}
    </View>
  )

  return (
    <View style={styles.controlsWrap}>
      <TouchableOpacity onPress={onAction}>
        <StopArea/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  controlsWrap: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    position: 'absolute',
  },
  stopIcon: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})