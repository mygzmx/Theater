import { StyleSheet, Image, View } from "react-native";
import Swiper from 'react-native-swiper';

interface IProps {
  bannerList: any[]
}

export default function SwiperNormal ({ bannerList }: IProps) {
  return (<View style={styles.swiperWrap}>
    <Swiper
      style={styles.swiper}
      height={133}
      horizontal={true}
      autoplay={true}
      paginationStyle={{bottom: 10}}
      showsPagination={true}
      showsButtons={false}>
      { bannerList.map(val => {
        return <Image key={val.id} source={{ uri: val.imgUrl }} style={styles.img}/>
      })}
    </Swiper>
  </View>);
}

const styles = StyleSheet.create({
  swiperWrap: {
    height: 133.5,
  },
  swiper: {
  },
  img: {
    width: '100%',
    height: 133,
    borderRadius: 6,
  }
});