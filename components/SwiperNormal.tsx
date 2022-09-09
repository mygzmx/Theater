import { StyleSheet, Image, View, Pressable, Dimensions } from "react-native";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useRef } from "react";
const { width } = Dimensions.get('screen');

interface IProps {
  bannerList: any[];
  bannerLink?: (item: any, index: number) => void;
}

export default function SwiperNormal ({ bannerList, bannerLink }: IProps) {

  const flatRef = useRef<SwiperFlatList>({} as SwiperFlatList);

  return ( <View style={styles.swiper}>
    <SwiperFlatList
      ref={flatRef}
      autoplay
      autoplayLoop
      data={bannerList}
      onEndReached={() => {
        flatRef.current?.goToFirstIndex()
      }}
      ListFooterComponent={() => <View style={{ width: 5, height: 5 }}/>}
      renderItem={({ item, index }) => (
        <Pressable style={styles.swiperItem} onPress={() => {
          bannerLink && bannerLink(item, index)
        }}>
          <Image source={{ uri: item.imgUrl }} style={styles.imgBox}/>
        </Pressable>
      )}
      keyExtractor={(item, index) => item.id + index }
      showPagination
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
    marginBottom: 20,
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
  },
});
