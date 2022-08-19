import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { IDramaItem } from "../../../interfaces/theater.interface";
import linking from "../../../navigation/LinkingConfiguration";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const ImgEmpty = require('../../../assets/images/img-empty.png');
const UpdateIcon = require('../../../assets/images/update-icon.png');
const MoreIcon = require('../../../assets/images/more-icon.png');


interface IProps {
  dramaList: IDramaItem[],
  linkTo: () => void;
}

export default function MyDrama({ dramaList, linkTo }: IProps) {
  const navigation = useNavigation()
  const linkToPlayer = async (item: IDramaItem) => {
    navigation.navigate('Player', { bookId: item.bookId })
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
    width: 86,
    height: 123,
    borderRadius: 8,
    overflow: 'hidden',
  },
  updateImg: {
    width: 30,
    height: 16,
  },
  bookName: {
    width: 86,
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