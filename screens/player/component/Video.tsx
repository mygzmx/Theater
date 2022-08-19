// import { Text, View, StyleSheet, Button } from 'react-native';
// import React, { useRef, useState } from 'react'
// import { Video, AVPlaybackStatus } from 'expo-av';
// import { ResizeMode } from "expo-av/src/Video.types";
// import { RootTabScreenProps } from "../../../types";
//
// export default function Video({ navigation }: RootTabScreenProps<'Theater'>) {
//   const player = useRef<Video>(null);
//   const [status, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);
//   const onEnd = () => {
//
//   }
//   const onLoad = () => {
//
//   }
//   const onError = () => {
//
//   }
//   const onProgress = () => {
//
//   }
//   const onSeek = () => {
//
//   }
//   return (
//     <View style={styles.container}>
//       {/*<Swiper*/}
//       {/*  style={styles.swiper}*/}
//       {/*  height={133}*/}
//       {/*  horizontal={false}*/}
//       {/*  autoplay={true}*/}
//       {/*  paginationStyle={{bottom: 10}}*/}
//       {/*  showsPagination={true}*/}
//       {/*  showsButtons={false}>*/}
//       {/*  <Image source={{ uri: 'val.imgUrl' }} style={{}}/>*/}
//       {/*</Swiper>*/}
//       <Video
//         ref={player}
//         style={styles.video}
//         source={{
//           uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//         }}
//         useNativeControls
//         resizeMode={ResizeMode.CONTAIN}
//         isLooping
//         onPlaybackStatusUpdate={status => setStatus(() => status)}
//       />
//       <View style={styles.buttons}>
//         <Button
//           title={!(status.isLoaded) || status.isPlaying ? 'Pause' : 'Play'}
//           onPress={() =>
//             !(status.isLoaded) || status.isPlaying ? player.current?.pauseAsync() : player.current?.playAsync()
//           }
//         />
//       </View>
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   swiper: {
//
//   },
//   video: {
//     width: '100%',
//     height: 600
//   },
//   buttons: {
//
//   }
// });
