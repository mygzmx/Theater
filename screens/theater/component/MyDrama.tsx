import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Pressable, Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import React from "react";
import { IDramaItem } from "../../../interfaces/theater.interface";
import { setBookId, setChapterId } from "../../../store/modules/player.module";
const ImgEmpty = require('../../../assets/images/img-empty.png');
const UpdateIcon = require('../../../assets/images/update-icon.png');
const MoreIcon = require('../../../assets/images/more-icon.png');
const { width } = Dimensions.get('screen');

interface IProps {
  dramaList: IDramaItem[],
}

export default function MyDrama({ dramaList }: IProps) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const linkToPlayer = async (item: IDramaItem) => {
    dispatch(setBookId(item.bookId))
    dispatch(setChapterId(item.chapterId))
    navigation.navigate('Player')
  }
  const renderItem = ({ item }: { item: IDramaItem }) => {
    return <Pressable onPress={() => linkToPlayer(item)}>
      <ImageBackground
        style={styles.coverImg}
        source={{ uri: item.coverImage }}
        defaultSource={ImgEmpty}>
        {item.isUpdate === 1 && <Image style={styles.updateImg} source={UpdateIcon}/>}
      </ImageBackground>
      <Text style={styles.bookName} numberOfLines={1} ellipsizeMode={'tail'}>{item.bookName}</Text>
      <Text style={styles.bookEpisode} numberOfLines={1} ellipsizeMode={'tail'}>{item.cname}</Text>
    </Pressable>
  }

  return (<View style={styles.dramaWrap}>
    <View style={styles.dramaHeader}>
      <Text style={styles.dramaTitle}>我的追剧</Text>
      <Pressable style={styles.dramaLink} onPress={() => navigation.navigate('Drama')}>
        <Text style={styles.dramaLinkTxt}>查看全部</Text>
        <Image style={styles.dramaLinkIcon} source={MoreIcon}/>
      </Pressable>
    </View>
    <FlatList
      style={styles.flatListBox}
      ItemSeparatorComponent={() => <View style={{ width: 12 }}/>}
      horizontal
      data={dramaList}
      renderItem={renderItem}
      ListFooterComponent={() => <Pressable style={[styles.dramaLink, { paddingLeft: 20, width: 120, height: 120, alignItems: 'center' }]} onPress={() => navigation.navigate('Drama')}>
      </Pressable>}
      keyExtractor={item => item.bookId}
    />
  </View>)
}

const styles = StyleSheet.create({
  dramaWrap: {
    paddingTop:  4,
    flexDirection: 'column',
    paddingBottom: 12,
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
    width,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 12,
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
