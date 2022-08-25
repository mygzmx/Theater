import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { IDramaItem } from "../../../interfaces/theater.interface";
import { useNavigation } from "@react-navigation/native";
import { setBookId, setChapterId } from "../../../store/modules/player.module";
import { useDispatch } from "react-redux";

const ImgEmpty = require('../../../assets/images/img-empty.png');
const UpdateIcon = require('../../../assets/images/update-icon.png');
const MoreIcon = require('../../../assets/images/more-icon.png');


interface IProps {
  dramaList: IDramaItem[],
}

export default function MyDrama({ dramaList }: IProps) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
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

  return (<View style={styles.dramaWrap}>
    <View style={styles.dramaHeader}>
      <Text style={styles.dramaTitle}>我的追剧</Text>
      <View style={styles.dramaLink}>
        <Text style={styles.dramaLinkTxt}>查看全部</Text>
        <Image style={styles.dramaLinkIcon} source={MoreIcon}/>
      </View>
    </View>
    <FlatList
      style={styles.flatListBox}
      horizontal={true}
      data={dramaList}
      renderItem={renderItem}
      keyExtractor={item => item.bookId}
    />
  </View>)
}

const styles = StyleSheet.create({
  dramaWrap: {
    paddingTop:  4,
    paddingBottom: 24,
    flexDirection: 'column',
  },
  dramaHeader: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: 36,
    justifyContent: 'space-between',
  },
  dramaTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dramaLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    height: 20,
    width: 70,
  },
  dramaLinkTxt: {
    fontSize: 14,
    color: '#7F7F7F',
  },
  dramaLinkIcon: {
    width: 10,
    height: 10,
    marginLeft: 4,
  },
  flatListBox: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  bookItem: {
    marginRight: 6,
    marginLeft: 6,
  },
  coverImg: {
    width: 100,
    height: 138,
    borderRadius: 8,
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
