import { StyleSheet, Image, View } from "react-native";
import { SwiperFlatList } from 'react-native-swiper-flatlist';

interface IProps {
  bannerList: any[];
}

export default function SwiperNormal ({ bannerList }: IProps) {
  return (<View style={styles.swiperWrap}>
    <SwiperFlatList
      autoplay
      index={2}
      autoplayLoop
      showPagination
      paginationDefaultColor={'rgba(255, 255, 255, 0.4)'}
      paginationStyleItem={{ width: 12, height: 5, borderRadius: 3, marginLeft: 4, marginRight: 4 }}
      paginationStyle={{
        bottom: -5,
        alignItems: 'flex-end'
      }}
    >
      { bannerList.map(val => {
        return <View key={val.id} style={styles.swiperItem}>
          <Image source={{ uri: val.imgUrl }} style={styles.imgBox}/>
        </View>
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
