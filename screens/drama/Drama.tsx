import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  ImageBackground
} from "react-native";
import { useEffect, useState } from "react";
import { IDramaItem } from "../../interfaces/theater.interface";
import { netDramaList } from "../../apis/Theater";
import { setBookId, setChapterId } from "../../store/modules/player.module";
import { useDispatch } from "react-redux";

const ImgEmpty = require('../../assets/images/img-empty.png');
const MoreIcon = require('../../assets/images/more-icon.png');
const UpdateIcon = require('../../assets/images/update-icon.png');
const ImgEdit = require('../../assets/images/theater/edit.png')
const ImgCancel = require('../../assets/images/cancel.png')

const { width, height } = Dimensions.get('window');
export default function Drama () {
  const [bingeList, setBingeList] = useState<IDramaItem[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    getDramaData(page);
  }, []);

  const getDramaData = async (p: number) => {
    const { recentReadList = [] } = await netDramaList({page: p});
    setBingeList(recentReadList);
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
  const linkToPlayer = async (item: IDramaItem) => {
    dispatch(setBookId(item.bookId))
    dispatch(setChapterId(item.chapterId))
    // @ts-ignore
    navigation.navigate('Player')
  }
  const renderItem = ({ item }: { item: IDramaItem }) => {
    return <TouchableWithoutFeedback onPress={() => linkToPlayer(item)}>
      <View style={styles.bookItem}>
        <ImageBackground
          style={styles.coverImg}
          source={{ uri: item.coverImage }}
          defaultSource={ImgEmpty}>
          {item.isUpdate == 1 && <Image style={styles.updateImg} source={UpdateIcon}/>}
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
      ItemSeparatorComponent={() => <View style={{width: 16, height: 24,}}/>}
      style={styles.flatListBox}
      horizontal={false}
      data={bingeList}
      renderItem={renderItem}
      keyExtractor={(item) => item.bookId}
    />
  </View>
}

const styles = StyleSheet.create({
  dramaPage: {
    width,
    height,
    paddingTop: 16,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
  },
  operations: {
    width: width - 20,
    paddingRight: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 45,
  },
  operationItem: {
    padding: 16,
    display: 'flex',
    alignItems: 'center',
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
    flex: 1,
  },
  bookItem: {
    width: (width - 72)/3,
    marginRight: 16,
  },
  coverImg: {
    height: (width - 72) / 3 * 1.4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  updateImg: {
    width: 30,
    height: 16,
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
  }
})
