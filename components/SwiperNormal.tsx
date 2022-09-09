import { StyleSheet, Image, View, Pressable, Dimensions } from "react-native";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
const { width } = Dimensions.get('window');

interface IProps {
  bannerList: any[];
  bannerLink?: (item: any, index: number) => void;
}

export default function SwiperNormal ({ bannerList, bannerLink }: IProps) {
  return ( <View style={styles.swiper}>
    <SwiperFlatList
      autoplay
      index={0}
      autoplayLoop
      showPagination
      data={bannerList}
      renderItem={({ item, index }) => (
        <Pressable key={item.id} style={styles.swiperItem} onPress={() => {
          bannerLink && bannerLink(item, index)
        }}>
          <Image source={{ uri: item.imgUrl }} style={styles.imgBox}/>
        </Pressable>
      )}
      paginationDefaultColor={'rgba(255, 255, 255, 0.4)'}
      paginationStyleItem={{ width: 12, height: 5, borderRadius: 3, marginLeft: 4, marginRight: 4 }}
      paginationStyle={{
        bottom: -5,
        alignItems: 'flex-end'
      }}
    />
  </View>);
}

const styles = StyleSheet.create({
  swiper: {
    height: 132.5,
    marginBottom: 24,
    width,
    paddingRight: 15,
    paddingLeft: 15,
  },
  swiperItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 30,
  },
  imgBox: {
    width: width - 40,
    height: 132.5,
    borderRadius: 6,
    overflow: 'hidden',
  }
});



// <Carousel
//   loop
//   autoPlay
//   width={390}
//   height={132.5}
//   data={bannerList}
//   scrollAnimationDuration={1000}
//   panGestureHandlerProps={{
//     activeOffsetX: [-10, 10]
//   }}
//   onSnapToItem={(index) => console.log('current index:', index)}
//   renderItem={({ item, index }) => (
//     <Pressable style={styles.swiperItem} onPress={() => {
//       bannerLink && bannerLink(item, index)
//     }}>
//       <Image source={{ uri: item.imgUrl }} style={styles.imgBox}/>
//     </Pressable>
//   )}
// />
