import { FlatList, Image, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { netViewRecordsList } from "../../apis/Self";
import { EIsAdd, IBookVoListItem } from "../../interfaces/viewingRecords.interface";
import Empty from "../../components/Empty";
import LoadMore from "../../components/LoadMore";
import ConfirmDialog from "../../components/ConfirmDialog";
import { setBookId, setChapterId } from "../../store/modules/player.module";
import { useAppDispatch } from "../../store";
import { RootStackScreenProps } from "../../@types";
const ImgEmpty = require('../../assets/images/img-empty.png');
const ImgHeartActive = require('../../assets/images/heart-active-icon.png')
const ImgHeartGrey = require('../../assets/images/heart-grey.png')

export default function AutoOrder ({ navigation }: RootStackScreenProps<'AutoOrder'>) {

  const dispatch = useAppDispatch();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageLoadingFull, setPageLoadingFull] = useState(false);
  const [list, setList] = useState<IBookVoListItem[]>([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [bookIdS, setBookIdS] = useState('');
  useEffect(() => {
    (async ()=> {
      await getList(page)
    })()
  }, [page]);

  const getList = async (p: number = 1) => {

    setPageLoading(true)
    const { bookVoList = [], bookSize = 0, size = 0 } = await netViewRecordsList(p)
    setPageLoading(false)
    if (p === 1) {
      setList(bookVoList)
      if (bookVoList.length === 0 || bookSize === 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    } else {
      setList(prevState =>  [...prevState, ...bookVoList])
    }
    const reqTotal = p * 12;
    if(reqTotal >= bookSize || size === 0 || bookVoList.length === 0){
      setPageLoadingFull(true)
    } else {
      setPageLoadingFull(false)
    }
  }
  const playVideo = (item: IBookVoListItem) => {
    dispatch(setBookId(item.bookId));
    dispatch(setChapterId(item.chapterId));
    navigation.navigate('Root', { screen: 'Player' })
  }

  const dramaVideo = async ({ bookId, isAdd }: IBookVoListItem) => {
    if(isAdd === EIsAdd.否) {
      // 追剧
      refreshData(bookId, EIsAdd.是);
      toast.show('追剧成功，可在剧场查看我的追剧');
    } else {
      setConfirmationVisible(true);
      setBookIdS(bookId);
    }
  }
  const confirm = async () => {
    // 取消追剧
    refreshData(bookIdS, EIsAdd.否);
    setConfirmationVisible(false);
    setBookIdS('');
  }

  const loadMore = async () => {
    if (pageLoadingFull || pageLoading) return;
    setPage(prevState => prevState + 1);
  }

  // 本地刷新
  const refreshData = (bookId: string, isAdd: EIsAdd) => {
    setList(prevState => prevState.map(item => {
      if (item.bookId === bookId) {
        return { ...item, isAdd }
      } else {
        return item
      }
    }))
  }
  const renderItem = ({ item }: {item: IBookVoListItem}) => {
    return<View style={styles.bookItem}>
      <TouchableWithoutFeedback onPress={() => playVideo(item)}>
        <Image
          style={styles.coverImg}
          source={{ uri: item.coverImage }}
          defaultSource={ImgEmpty}/>
      </TouchableWithoutFeedback>
      <Pressable style={styles.bookMsg}>
        <Text style={styles.bookName} numberOfLines={1} ellipsizeMode={'tail'}>{item.bookName}</Text>
        <Text style={styles.bookEpisode} numberOfLines={1} ellipsizeMode={'tail'}>{item.cname}</Text>
      </Pressable>
      <TouchableWithoutFeedback onPress={() => dramaVideo(item)}>
        <View style={styles.itemDrama}>
          <Image style={styles.itemDramaImg} source={item.isAdd === EIsAdd.是 ? ImgHeartActive : ImgHeartGrey}/>
          <Text style={{ ...styles.itemDramaTxt, color: item.isAdd === EIsAdd.是 ? "#FF4B00" : '#404657' }}>
            {item.isAdd === EIsAdd.是 ? '已追剧' : '追剧'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  }


  return <FlatList
    style={styles.viewingWrap}
    data={list}
    renderItem={(info) => renderItem(info)}
    keyExtractor={(item) => item.bookId}
    ListEmptyComponent={() => isEmpty ? <Empty style={{ height: 600 }} theme={'white'} message={'暂无观看记录'}/> : null}
    onEndReached={(info) => !isEmpty && loadMore()}
    ListFooterComponent={() =>  isEmpty ? null : <LoadMore loading={pageLoading} hasMore={!pageLoadingFull}/>}
    ListHeaderComponent={() => <ConfirmDialog
      visible={confirmationVisible}
      rightBtn={() => setConfirmationVisible(false)}
      leftBtn={() => confirm()}
      close={() => setConfirmationVisible(false)}
      leftTxt="确认"
      rightTxt="再想想"
      title="确认取消追剧吗？"
      message="取消后您将无法快速找到本剧"/>}
  />
}

const styles = StyleSheet.create({
  viewingWrap: {
    position: "relative",
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFFFFF'
  },
  bookItem: {
    marginTop: 20,
    width: '100%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  coverImg: {
    width: 63,
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bookMsg: {
    display: "flex",
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
  },
  bookName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191919',
  },
  bookEpisode: {
    marginTop: 8,
    fontSize: 12,
    color: '#9E9E9E',
  },
  itemDrama: {
    width: 50,
    alignItems: 'center',
  },
  itemDramaImg: {
    width: 20,
    height: 20,
    marginBottom: 4,
  },
  itemDramaTxt: {
    fontSize: 14,
  },
})
