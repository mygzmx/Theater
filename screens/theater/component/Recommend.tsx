import {
  Text,
  StyleSheet,
  Image,
  Dimensions, Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { IVideoListItem } from "../../../interfaces/theater.interface";
import { setBookId, setChapterId } from "../../../store/modules/player.module";
const ImgEmpty = require('../../../assets/images/img-empty.png')

interface IProps {
  item: IVideoListItem;
  index: number;
}

export default function Recommend({ item, index }: IProps) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const linkToPlayer = async (item: IVideoListItem) => {
    dispatch(setBookId(item.bookId))
    dispatch(setChapterId(item.chapterId))
    // @ts-ignore
    navigation.navigate('Player')
  }
  const { bookName, bookId } = item
  return (<Pressable style={styles.recommendItem} onPress={() => linkToPlayer(item)}>
    <Image style={styles.recommendImg} source={{ uri: item.coverWap }} defaultSource={ImgEmpty}/>
    <Text style={styles.recommendBookName} numberOfLines={1} ellipsizeMode={'tail'}>{bookName}</Text>
  </Pressable>
  )
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  recommendItem: {
    width: (width - 72)/3,
    marginRight: 16,
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
