import {
  Text,
  StyleSheet,
  Image,
  Dimensions, Pressable,
} from "react-native";
import { IVideoListItem } from "../../../interfaces/theater.interface";
const ImgEmpty = require('../../../assets/images/img-empty.png')

interface IProps {
  item: IVideoListItem;
  index: number;
  linkToPlayer: (item: IVideoListItem) => void;
}

export default function Recommend({ item, linkToPlayer }: IProps) {

  const { bookName, coverWap } = item
  return (<Pressable style={styles.recommendItem} onPress={() => linkToPlayer(item)}>
    <Image style={styles.recommendImg} source={{ uri: coverWap }} defaultSource={ImgEmpty}/>
    <Text style={styles.recommendBookName} numberOfLines={1} ellipsizeMode={'tail'}>{bookName}</Text>
  </Pressable>
  )
}

const { width } = Dimensions.get('screen');
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
