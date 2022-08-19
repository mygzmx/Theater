import { Text, View, StyleSheet, Button } from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import { Video, AVPlaybackStatus } from 'expo-av';
import Swiper from "react-native-swiper";
import { ResizeMode } from "expo-av/src/Video.types";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Player() {
  const player = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);
  const navigation = useNavigation();
  const route = useRoute()
  useEffect(() => {
    console.log('route--------_>', route)
    if (route.params) {
      const { bookId = '' } = route.params as { bookId?: string };
      console.log('bookId--------_>', bookId);
    }
  }, [route]);

  const onEnd = () => {
    
  }
  const onLoad = () => {
    
  }
  const onError = () => {
    
  }
  const onProgress = () => {
    
  }
  const onSeek = () => {
    
  }
  return (
    <View style={styles.container}>
      {/*<Swiper*/}
      {/*  style={styles.swiper}*/}
      {/*  height={133}*/}
      {/*  horizontal={false}*/}
      {/*  autoplay={true}*/}
      {/*  paginationStyle={{bottom: 10}}*/}
      {/*  showsPagination={true}*/}
      {/*  showsButtons={false}>*/}
      {/*  <Image source={{ uri: 'val.imgUrl' }} style={{}}/>*/}
      {/*</Swiper>*/}
      <Video
        ref={player}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={!(status.isLoaded) || status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            !(status.isLoaded) || status.isPlaying ? player.current?.pauseAsync() : player.current?.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiper: {

  },
  video: {
    width: '100%',
    height: 600
  },
  buttons: {

  }
});
