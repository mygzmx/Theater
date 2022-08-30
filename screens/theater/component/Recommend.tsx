import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { IVideoListItem } from "../../../interfaces/theater.interface";
import { setBookId, setChapterId } from "../../../store/modules/player.module";
const ImgEmpty = require('../../../assets/images/img-empty.png')

interface IProps {
  videoList: IVideoListItem[];
}

export default function Recommend({ videoList }: IProps) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const linkToPlayer = async (item: IVideoListItem) => {
    dispatch(setBookId(item.bookId))
    dispatch(setChapterId(item.chapterId))
    // @ts-ignore
    navigation.navigate({ name: 'Player' })
  }

  return (<View style={styles.flatListBox}>
    {videoList.map((videoItem, videoInd) => {
      const {bookName, bookId} = videoItem
      return (<TouchableWithoutFeedback key={`${bookId}_${videoInd}`} onPress={() => linkToPlayer(videoItem)}>
          <View style={styles.recommendItem}>
            <Image style={styles.recommendImg} source={{uri: videoItem.coverWap}} defaultSource={ImgEmpty}/>
            <Text style={styles.recommendBookName} numberOfLines={1} ellipsizeMode={'tail'}>{bookName}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    })}
  </View>)
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  flatListBox: {
    marginLeft: 20,
    width: width - 20,
    display: "flex",
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  recommendItem: {
    width: (width - 72)/3,
    marginRight: 16,
    marginBottom: 17,
  },
  recommendImg: {
    height: 145,
    borderRadius: 8,
  },
  recommendBookName: {
    height: 20,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    marginTop: 8,
  }
})
