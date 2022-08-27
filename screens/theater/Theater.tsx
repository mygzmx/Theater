import { ScrollView, StyleSheet, RefreshControl, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { RootTabScreenProps } from '../../types';
import React, { useEffect, useState } from "react";
import { netDramaList, netRecommendData } from "../../apis/Theater";
import SwiperNormal from "../../components/SwiperNormal";
import MyDrama from "./component/MyDrama";
import { IClassificationItem, IDramaItem, IVideoListItem } from "../../interfaces/theater.interface";
import Recommend from "./component/Recommend";
import LoadMore from "../../components/LoadMore";

export default function Theater({ navigation }: RootTabScreenProps<'Theater'>) {
  const [page, setPage] = useState(1);
  const [dramaList, setDramaList] = useState<IDramaItem[]>([]);
  const [bannerList, setBannerList] = useState<{ imgUrl: string }[]>([]);
  const [activeRecommendType, setActiveRecommendType] = useState('0');
  const [typeList, setTypeList] = useState<IClassificationItem[]>([]);
  const [videoList, setVideoList] = useState<IVideoListItem[]>([]);

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    initPageData().then(() => {})
    setPage(1)
  }, [])

  const initPageData = async () => {
    const { recentReadList = [], operList = [] } = await netDramaList({page: 1, size: 10});
    setDramaList(recentReadList);
    setBannerList(operList);
    await getColumnList(page, undefined,true, true)
  }
  const getColumnList = async (index: number, tid?: number | string, flag?: boolean, isNeedClassificationList?: boolean) => {
    const {books = [], classificationList = [] } = await netRecommendData({index: page, tid});
    if (isNeedClassificationList) {
      setTypeList([{ labelId: '0', labelName: '全部' }, ...classificationList] as IClassificationItem[]);
    }
    if(flag) {
      setVideoList([...books]);
      // 初始如果请求数量太少就发送二次请求
      if(books.length < 12){
        await getColumnList(page + 1 );
      }
    } else {
      setVideoList([ ...videoList, ...books]);
      if(books.length === 0){
        setPageLoadingFull(true);
      }
    }
  }
  const changeRecommendType = async (item: IClassificationItem) => {
    if (activeRecommendType === item.labelId) return;
    setPage(1)
    setActiveRecommendType(item.labelId)
    setPageLoading(true);
    setPageLoadingFull(false);
    await getColumnList(1, item.labelId,true);
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPage(1)
    setActiveRecommendType('0');
    setPageLoading(false);
    setPageLoadingFull(false);
    console.log('onRefresh-------------------_>');
    initPageData().then(() => setRefreshing(false));
  }, []);

  const [pageLoading, setPageLoading] = useState(false);
  const [pageLoadingFull, setPageLoadingFull] = useState(false);
  const loadMore = async () => {
    console.log('loadMore-------------------_>');
    setPageLoading(true);
    setPage((page + 1))
    await getColumnList(page + 1, activeRecommendType);
    setPageLoading(false);
  }

  const onMomentumScrollEnd = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
    const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
    const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
    // console.log(`offSetY${offSetY}`);
    // console.log(`oriageScrollHeight${oriageScrollHeight}`);
    // console.log(`contentSizeHeight${contentSizeHeight}`);
    if (offSetY + oriageScrollHeight >= contentSizeHeight - 1) {
      if (!pageLoadingFull) {
        await loadMore();
      }
    }
  }
  return (
    <ScrollView
      overScrollMode={'auto'}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      onScrollEndDrag={(e) => onMomentumScrollEnd(e)}
      style={styles.container}>
      <SwiperNormal bannerList={bannerList}/>
      <MyDrama dramaList={dramaList}/>
      <Recommend
        changeType={(item) => changeRecommendType(item)}
        activeRecommendType={activeRecommendType}
        typeList={typeList}
        videoList={videoList}
      />
      <LoadMore loading={pageLoading} hasMore={!pageLoadingFull}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'rgba(25, 25, 25, 1)',
    flex:1
  },
  separator: {
    height: 50
  },
  separatorText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
