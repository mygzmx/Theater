import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { IDramaItem } from "../../interfaces/theater.interface";
import { netDramaList, netNoDramaVideo } from "../../apis/Theater";
import { setBookId, setChapterId } from "../../store/modules/player.module";
import { getLogTime } from "../../utils/logTime";
import LoadMore from "../../components/LoadMore";
import Empty from "../../components/Empty";
const ImgEmpty = require('../../assets/images/img-empty.png');
const UpdateIcon = require('../../assets/images/update-icon.png');
const ImgEdit = require('../../assets/images/theater/edit.png')
const ImgCancel = require('../../assets/images/cancel.png')
const ImgUnchecked = require('../../assets/images/theater/unchecked-icon.png')
const ImgChecked = require('../../assets/images/theater/checked-icon.png')
const { width, height } = Dimensions.get('window');

enum ECheckedState {
  全没选中 = 0,
  全选中 = 1,
  部分选中 = 2,
}

export default function Drama () {
  const navigation = useNavigation()
  const toast = useToast();
  const [pageLoading, setPageLoading] = useState(true);
  const [pageLoadingFull, setPageLoadingFull] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [bingeList, setBingeList] = useState<IDramaItem[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [checkedState, setCheckedState] = useState(ECheckedState.全没选中);
  const [omap, setOmap] = useState({
    origin: '我的追剧-详情页',
    action: '2',
    channel_id: 'wdzj',
    channel_name: '我的追剧',
    channel_pos: 0,
    column_id: 'wdjx_xqy',
    column_name: '我的追剧-详情页',
    column_pos: 0,
    content_id: '',
    content_pos: '',
    content_type: '2',
    trigger_time: ''
  });
  const dispatch = useDispatch();
  useEffect(() => {
    getDramaData(1)
  }, []);

  useEffect(() => {
    if (bingeList.length > 0) {
      const checkedLength = bingeList.filter(val => val.isChecked).length
      if (checkedLength === bingeList.length) {
        setCheckedState(ECheckedState.全选中)
      } else if (checkedLength == 0) {
        setCheckedState(ECheckedState.全没选中)
      } else {
        setCheckedState(ECheckedState.部分选中)
      }
    }
  }, [bingeList]);

  const getDramaData = async (p: number) => {
    setPage(p)
    setPageLoading(true);
    const { recentReadList = [], recentReadAllSize = 0 } = await netDramaList({ page: p });
    setPageLoading(false);
    setBingeList(recentReadList);
    if(recentReadAllSize === 0 || recentReadList.length === 0){
      setIsEmpty(true);
      return;
    }
    const reqTotal = p * 12;
    if(recentReadAllSize <= bingeList.length || recentReadAllSize <= reqTotal){
      setPageLoadingFull(true);
    } else {
      setPageLoadingFull(false);
    }
  }
  const loadMore = async () => {
    if (pageLoadingFull || pageLoading) return;
    console.log('loadMore----------->', pageLoadingFull)
    await getDramaData(page + 1)
  }
  // 点击编辑按钮
  const edit = () => {
    setBingeList(prevState => prevState.map(val => ({ ...val, isChecked: false })));
    setIsEdit(true);
  }
  // 取消
  const cancel = () => {
    setIsEdit(false);
  }
  // 编辑状态单点点击选中 ｜ 跳转继续播放
  const linkToPlayer = async (item: IDramaItem) => {
    if(isEdit) {
      setBingeList(prevState => prevState.map(val => {
        if (val.bookId === item.bookId) {
          return { ...val, isChecked: !val.isChecked }
        }
        return val;
      }));
    } else {
      dispatch(setBookId(item.bookId))
      dispatch(setChapterId(item.chapterId))
      // @ts-ignore
      navigation.navigate('Player')
    }
  }
  // 全选
  const allIn = () => {
    if(checkedState === ECheckedState.全选中) return;
    setBingeList(prevState => prevState.map(val => ({ ...val, isChecked: true })));
  }
  const deleteEvent = async () => {
    if(checkedState === ECheckedState.全没选中) return;
    const deleteArr: string[] = [];
    const indexArr: number[] = [];
    bingeList.forEach((element, index) => {
      if (element.isChecked) {
        deleteArr.push(element.bookId);
        indexArr.push(index);
      }
    });
    const scene = '我的追剧';
    setOmap(prevState => ({ ...prevState, content_pos: indexArr.join(','), content_id: deleteArr.join(','), trigger_time: getLogTime() }))
    await netNoDramaVideo(deleteArr.join(','), scene, omap)
    setIsEdit(false);
    setPage(1);
    await getDramaData(1);
    toast.show('删除成功');
  }
  const renderItem = ({ item }: { item: IDramaItem }) => {
    return <TouchableWithoutFeedback onPress={() => linkToPlayer(item)}>
      <View style={styles.bookItem}>
        <ImageBackground
          style={styles.coverImg}
          source={{ uri: item.coverImage }}
          defaultSource={ImgEmpty}>
          {item.isUpdate == 1 && <Image style={styles.updateImg} source={UpdateIcon}/>}
          {isEdit && (item.isChecked ? <Image source={ImgChecked} style={styles.checkedIcon} /> :
            <Image style={styles.checkedIcon} source={ImgUnchecked}/>
          )}
        </ImageBackground>
        <Text style={styles.bookName} numberOfLines={1} ellipsizeMode={'tail'}>{item.bookName}</Text>
        <Text style={styles.bookEpisode} numberOfLines={1} ellipsizeMode={'tail'}>{item.cname}</Text>
      </View>
    </TouchableWithoutFeedback>
  }

  return <View style={styles.dramaPage}>
    { bingeList.length > 0 && <View style={styles.operations}>
      { isEdit ? <TouchableWithoutFeedback onPress={() => cancel()}>
        <View style={styles.operationItem}>
          <Text style={styles.operationTxt}>取消</Text>
          <Image style={styles.operationImg} source={ImgCancel}/>
        </View>
      </TouchableWithoutFeedback> :
        <TouchableWithoutFeedback onPress={() => edit()}>
          <View style={styles.operationItem}>
            <Text style={styles.operationTxt}>编辑</Text>
            <Image style={styles.operationImg} source={ImgEdit}/>
          </View>
        </TouchableWithoutFeedback>
      }
    </View> }
    <FlatList
      numColumns={3}
      ItemSeparatorComponent={() => <View style={{ width: 16, height: 24, }}/>}
      style={{ ...styles.flatListBox, height: isEdit ? height - 220 : height - 171 }}
      horizontal={false}
      data={bingeList}
      renderItem={renderItem}
      keyExtractor={(item) => item.bookId}
      ListEmptyComponent={() => isEmpty ? <Empty style={{ height: 600 }} theme={'dark'} message={'暂无追剧'}/> : null}
      onEndReached={(info) => !isEmpty && loadMore()}
      ListFooterComponent={() =>  isEmpty ? null : <LoadMore loading={pageLoading} hasMore={!pageLoadingFull}/>}
    />
    { isEdit && <View style={styles.footer}>
      <TouchableWithoutFeedback onPress={() => allIn()}>
        <View style={styles.footerItem}>
          <Text style={{ ...styles.footerItemTxt, color: checkedState === ECheckedState.全选中 ? '#7F7F7F' : '#ffffff' }} >全选</Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.footerLine}/>
      <TouchableWithoutFeedback onPress={() => deleteEvent()}>
        <View style={styles.footerItem}>
          <Text style={{ ...styles.footerItemTxt, color: checkedState === ECheckedState.全没选中 ? '#7F7F7F' : '#ffffff' }} >删除</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
    }
  </View>
}

const styles = StyleSheet.create({
  dramaPage: {
    width,
    height,
    paddingTop: 16,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(25, 25, 25, 1)',
  },
  operations: {
    paddingRight: 6,
    width,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 45,
  },
  operationItem: {
    height: 45,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  operationTxt: {
    fontSize: 14,
    color: '#a4a4a4'
  },
  operationImg: {
    width: 14,
    height: 14,
    marginLeft: 4,
  },
  flatListBox: {
    paddingLeft: 20,
    paddingRight: 20,
    // flex: 1,
    height: height - 240,
    flexGrow: 0,
  },
  bookItem: {
    width: (width - 72)/3,
    marginRight: 16,
  },
  coverImg: {
    height: (width - 72) / 3 * 1.4,
    borderRadius: 6,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-end',
  },
  updateImg: {
    width: 30,
    height: 16,
  },
  checkedIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    marginTop: 8,
  },
  bookName: {
    width: 100,
    height: 20,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 1,
  },
  bookEpisode: {
    height: 16,
    fontSize: 12,
    color: '#7F7F7F',
    lineHeight: 16,
  },
  footer: {
    width,
    height: 60,
    backgroundColor: '#0F0F0F',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: "center",
    flexDirection: 'row',
  },
  footerItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: "center",
  },
  footerLine: {
    width: 1,
    height: '100%',
    backgroundColor: '#4E5054',
  },
  footerItemTxt: {
    fontSize: 18,
    color: '#fff',
  },
})
