import { Dimensions, StyleSheet, Text, Animated, } from 'react-native';

export default function SwiperFlatListNoData ({ sliderHeight }: { sliderHeight: Animated.Value; }) {

  return <Animated.View style={[styles.noDataWrap, {
    top: sliderHeight
  }]}>
    <Text style={styles.noDataWrapTxt}>滑不动了 已经是第一集啦～</Text>
  </Animated.View>;
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  noDataWrap: {
    position: 'absolute',
    top: -44,
    left: 0,
    width,
    height: 44,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataWrapTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
})
