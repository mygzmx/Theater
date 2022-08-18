import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { useEffect, useState } from "react";
import { netDramaList, netRecommendData, netTheaterPage } from "../../apis/Theater";
import SwiperNormal from "../../components/SwiperNormal";
import MyDrama from "./component/MyDrama";
import { IClassificationItem, IDramaItem, IVideoListItem } from "../../interfaces/theater.interface";
import Recommend from "./component/Recommend";

export default function Theater({ navigation }: RootTabScreenProps<'Theater'>) {
  const [page, setPage] = useState(1);
  const [tid, setTid] = useState();
  const [dramaList, setDramaList] = useState<IDramaItem[]>([]);
  const [bannerList, setBannerList] = useState<{ imgUrl: string }[]>([]);
  const [activeRecommendType, setActiveRecommendType] = useState('0');
  const [typeList, setTypeList] = useState<IClassificationItem[]>([]);
  const [videoList, setVideoList] = useState<IVideoListItem[]>([]);
  useEffect(() => {
    initPageData();
  }, [])

  const initPageData = async () => {
    const { classificationList = []} = await netTheaterPage();
    setTypeList([{ labelId: '0', labelName: '全部' }, ...classificationList] as IClassificationItem[]);
    const { recentReadList = [], operList = [] } = await netDramaList({page: 1, size: 10});
    setDramaList(recentReadList);
    setBannerList(operList);
    await getColumnList(true)
  }
  const getColumnList = async (flag: boolean) => {
    const tid = activeRecommendType === '0' ? undefined : activeRecommendType;
    const {books = []} = await netRecommendData({index: page, tid});
    setVideoList(books);
  }
  const changeRecommendType = (item: IClassificationItem) => {
    if (activeRecommendType === item.labelId) return;
    setPage(1)
    setActiveRecommendType(item.labelId)
    // this.isShowMore = true;
    // this.isHasMore = true;
    getColumnList(true);
  }

  return (
    <View style={styles.container}>
      <SwiperNormal bannerList={bannerList}/>
      <MyDrama dramaList={dramaList}/>
      <Recommend
        changeType={changeRecommendType}
        activeRecommendType={activeRecommendType}
        typeList={typeList}
        videoList={videoList}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'rgba(25, 25, 25, 1)',
    overflow: "scroll",
  },
  separator: {
    marginVertical: 30,
    height: 1,
  },
});
