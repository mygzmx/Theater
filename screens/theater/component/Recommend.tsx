import { View, Text, FlatList, StyleSheet } from "react-native";
import { IClassificationItem, IVideoListItem } from "../../../interfaces/theater.interface";


interface IProps {
  activeRecommendType: string;
  typeList: IClassificationItem[];
  videoList: IVideoListItem[];
  changeType: (item: IClassificationItem) => void;
}

export default function Recommend(props: IProps) {
  const { typeList, videoList, activeRecommendType, changeType } = props;
  // 标题
  const RecommendTitle = () => {
    const renderTypeItem = ({ item }: {item: IClassificationItem}) => {
      const { labelId, labelName } = item;
      return (<View style={styles.typeListBoxItem}>
        <Text
          style={activeRecommendType === labelId ? styles.typeListActiveBoxTxt : styles.typeListBoxTxt}
          onPress={() => changeType(item)}>{labelName}</Text>
        { labelId !== typeList[typeList.length - 1].labelId && <View style={styles.typeListBoxLine}/>}
      </View>);
    }
    return (
      <FlatList
        style={styles.typeListBox}
        horizontal={true}
        data={typeList}
        renderItem={renderTypeItem}
        keyExtractor={item => item.labelId}
      />
    )
  }


  const RecommendVideo = () => {
    return (<View>
      {videoList.map(videoItem => {
        const {bookName, bookId} = videoItem
        return (
          <View key={bookId}>
            <Text>{bookName}</Text>
            <View>
              <Text>{bookName}</Text>
            </View>
            <View>
              <Text>{bookName}</Text>
            </View>
          </View>
        )
      })}
    </View>)
  }

  return (<View style={styles.recommendWrap}>
    <Text style={styles.recommendTitle}>精选推荐</Text>
    <RecommendTitle/>
    <RecommendVideo/>
  </View>)
}

const styles = StyleSheet.create({
  recommendWrap: {
    paddingTop: 4,
  },
  recommendTitle: {
    paddingRight: 20,
    paddingLeft: 20,
    height: 25,
    fontSize: 18,
    fontWeight: "bold",
    color: '#FFFFFF',
    lineHeight: 25,
  },
  typeListBox: {
    paddingLeft: 8,
    paddingBottom: 4,
    display: 'flex',
    height: 45,
  },
  typeListBoxItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  typeListBoxTxt: {
    padding: 12,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7F7F7F',
    lineHeight: 21,
  },
  typeListActiveBoxTxt: {
    padding: 12,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 21,
  },
  typeListBoxLine: {
    width: 1,
    height: 12,
    backgroundColor: '#444444',
  },
  flatListBox: {
    paddingRight: 20,
    paddingLeft: 20,
  }
})