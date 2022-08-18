import { View, Text, FlatList, Image, ImageBackground, StyleSheet } from "react-native";
import { IDramaItem } from "../../../interfaces/theater.interface";

interface IProps {
  dramaList: IDramaItem[]
}

export default function MyDrama({ dramaList }: IProps) {
  const renderItem = ({ item }: { item: IDramaItem }) => {
    return <View>
        <ImageBackground
          style={styles.coverImg}
          source={{uri: item.coverImage}}
          defaultSource={{uri: '../../../assets/images/img-empty.png'}}>
          {item.isUpdate == 1 && <Image style={styles.updateImg} source={{uri: '../../../assets/images/update-icon.png'}}/>}
        </ImageBackground>
      <Text style={styles.bookName}>{item.bookName }</Text>
      <Text style={styles.bookEpisode} >{ item.cname }</Text>
    </View>;
  }

  return <View>
    <View>
      <Text>我的追剧</Text>
      <Text>查看全部</Text>
    </View>
    <FlatList
      data={dramaList}
      renderItem={renderItem}
      keyExtractor={item => item.bookId}
    >
    </FlatList>
  </View>
}

const styles = StyleSheet.create({
  coverImg: {
    width: 172,
    height: 246,
    borderRadius: 16,
  },
  updateImg: {
    width:60,
    height:32,
    margin:0,
  },
  bookName: {
    width: 172,
    height: 40,
    fontSize: 28,
    color: '#FFFFFF',
    lineHeight: 40,
    // lines: 1,
    textOverflow: 'ellipsis',
    // margin: 16 0 2,
  },
  bookEpisode: {
    height: 33,
    fontSize: 24,
    color: '#7F7F7F',
    lineHeight: 33,
    lines: 1,
    textOverflow: 'ellipsis',
  }
})