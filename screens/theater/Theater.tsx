import { StyleSheet, FlatList, View } from 'react-native';
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { RootTabScreenProps } from '../../@types';
import { netDramaList, netRecommendData } from "../../apis/Theater";
import SwiperNormal from "../../components/SwiperNormal";
import { IClassificationItem, IDramaItem, IVideoListItem } from "../../interfaces/theater.interface";
import LoadMore from "../../components/LoadMore";
import Empty from "../../components/Empty";
import { setBookId, setChapterId } from "../../store/modules/player.module";
import Recommend from "./component/Recommend";
import MyDrama from "./component/MyDrama";
import RecommendTitle from "./component/RecommendTitle";

export default function Theater({ navigation }: RootTabScreenProps<'Theater'>) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [page, setPage] = useState(1);
  const [dramaList, setDramaList] = useState<IDramaItem[]>([]);
  const [bannerList, setBannerList] = useState<{ imgUrl: string }[]>([]);
  const [activeRecommendType, setActiveRecommendType] = useState('0');
  const [typeList, setTypeList] = useState<IClassificationItem[]>([]);
  const [videoList, setVideoList] = useState<IVideoListItem[]>([]);

  useEffect(() => {
    getColumnList(1, activeRecommendType === "0" ? undefined : activeRecommendType,true, true).then(() => {})
  }, [activeRecommendType])

  useFocusEffect(
    useCallback(() => {
      // console.log('=================显示');
      getDramaData().then(() => {});
      return () => {
        // console.log('============隐藏');
      };
    }, []),
  );
  const getDramaData = async () => {
    const { recentReadList = [], operList = [] } = await netDramaList({ page: 1, size: 10 });
    setDramaList(recentReadList);
    setBannerList(operList);
  }
  const getColumnList = async (index: number, tid?: number | string, flag?: boolean, isNeedClassificationList?: boolean) => {
    setPage(index)
    setPageLoading(true);
    const { books = [], classificationList = [] } = await netRecommendData({ index, tid });
    setPageLoading(false);
    if (isNeedClassificationList) {
      setTypeList([{ labelId: '0', labelName: '全部' }, ...classificationList] as IClassificationItem[]);
    }
    if(flag) {
      if (books.length === 0) {
        setIsEmpty(true)
        return;
      }
      setVideoList([...books]);
      // 初始如果请求数量太少就发送二次请求
      if(books.length < 12){
        await getColumnList(index + 1 );
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
    setActiveRecommendType(item.labelId)
    setPageLoadingFull(false);
  }

  const onRefresh = React.useCallback(() => {
    setPage(1)
    setActiveRecommendType('0');
    setPageLoadingFull(false);
    getColumnList(1, undefined,true, true)
  }, []);

  const [pageLoading, setPageLoading] = useState(false);
  const [pageLoadingFull, setPageLoadingFull] = useState(false);
  const loadMore = async () => {
    if (pageLoading || pageLoadingFull) return;
    await getColumnList(page + 1, activeRecommendType);
  }

  const dispatch = useDispatch()
  const linkToPlayer = async (item: IVideoListItem) => {
    dispatch(setBookId(item.bookId))
    dispatch(setChapterId(item.chapterId))
    navigation.navigate('SecondaryPlayer')
  }

  return <FlatList
    style={styles.container}
    ListHeaderComponent={() => <>
      { bannerList.length> 0 && <SwiperNormal bannerList={bannerList}/> }
      { dramaList.length > 0 && <MyDrama dramaList={dramaList}/> }
      <RecommendTitle
        typeList={typeList}
        activeRecommendType={activeRecommendType}
        changeType={(item) => changeRecommendType(item)}/>
    </>}
    ListEmptyComponent={() => isEmpty ? <Empty style={{ height: 300 }} theme={'dark'} message={'暂无推荐视频'}/> : null}
    refreshing={false}
    onRefresh={onRefresh}
    numColumns={3}
    columnWrapperStyle={{ paddingLeft: 20, paddingRight: 20 }}
    ItemSeparatorComponent={() => <View style={{ height: 16 }}/>}
    horizontal={false}
    data={videoList}
    renderItem={({ item, index }) => <Recommend linkToPlayer={linkToPlayer} item={item} index={index}/> }
    onEndReached={(info) => !isEmpty && loadMore()}
    ListFooterComponent={() =>  isEmpty ? null : <LoadMore loading={pageLoading} hasMore={!pageLoadingFull}/>}
    keyExtractor={(item) => item.bookId}
  />
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
