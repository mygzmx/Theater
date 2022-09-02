import { StyleSheet, Image, View, Pressable } from "react-native";
import { SwiperFlatList } from 'react-native-swiper-flatlist';

interface IProps {
  bannerList: any[];
  bannerLink?: (item: any, index: number) => void;
}

export default function SwiperNormal ({ bannerList, bannerLink }: IProps) {
  return (<View style={styles.swiperWrap}>
    <SwiperFlatList
      autoplay
      index={0}
      autoplayLoop
      showPagination
      paginationDefaultColor={'rgba(255, 255, 255, 0.4)'}
      paginationStyleItem={{ width: 12, height: 5, borderRadius: 3, marginLeft: 4, marginRight: 4 }}
      paginationStyle={{
        bottom: -5,
        alignItems: 'flex-end'
      }}
    >
      { bannerList.map((item, index) => {
        return <Pressable key={item.id} style={styles.swiperItem} onPress={() => {
          bannerLink && bannerLink(item, index)
        }}>
          <Image source={{ uri: item.imgUrl }} style={styles.imgBox}/>
        </Pressable>
      })}
    </SwiperFlatList>
  </View>);
}

const styles = StyleSheet.create({
  swiperWrap: {
    height: 132.5,
    marginBottom: 24,
    paddingRight: 15,
    paddingLeft: 15,
  },
  swiper: {
  },
  swiperItem: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 5,
    paddingLeft: 5,
  },
  imgBox: {
    width: 375,
    height: 132.5,
    borderRadius: 6,
  }
});
