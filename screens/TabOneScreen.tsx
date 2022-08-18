import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect, useState } from "react";
import { netDramaList, netRecommendData, netTheaterPage } from "../apis/Theater";
import SwiperNormal from "../components/SwiperNormal";
import MyDrama from "./theater/component/MyDrama";

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [page, setPage] = useState(1);
  const [tid, setTid] = useState();
  const [dramaList, setDramaList] = useState([]);
  const [bannerList, setBannerList] = useState<{ imgUrl: string }[]>([]);
  const [typeList, setTypeList] = useState<{labelId: string, labelName: string}[]>([]);
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    initPageData();
  }, [])

  const initPageData = async () => {
    const { classificationList = []} = await netTheaterPage();
    setTypeList(classificationList);
    const { recentReadList = [], operList = [] } = await netDramaList({page: 1, size: 10});
    setDramaList(recentReadList);
    setBannerList(operList);
    const {books = []} = await netRecommendData({index: page, tid});
    setVideoList(books);
  }

  return (
    <View style={styles.container}>
      <SwiperNormal bannerList={bannerList}/>
      {typeList.map(({ labelId, labelName }) => {
        return <Text key={labelId}>{labelName}</Text>;
      })}
      {/*<MyDrama dramaList={dramaList}/>*/}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 12,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 12,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
