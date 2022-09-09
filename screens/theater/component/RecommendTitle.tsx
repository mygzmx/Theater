import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { IClassificationItem } from "../../../interfaces/theater.interface";

interface IProps {
  activeRecommendType: string;
  typeList: IClassificationItem[];
  changeType: (item: IClassificationItem) => void;
}

export default function RecommendTitle (props: IProps) {
  const { typeList, activeRecommendType, changeType } = props;
  const renderTypeItem = ({ item }: {item: IClassificationItem}) => {
    const { labelId, labelName } = item;
    return (
      <TouchableWithoutFeedback onPress={() => changeType(item)}>
        <View style={styles.typeListBoxItem}>
          <Text style={activeRecommendType === labelId ? styles.typeListActiveBoxTxt : styles.typeListBoxTxt}>{labelName}</Text>
          { labelId !== typeList[typeList.length - 1].labelId && <View style={styles.typeListBoxLine}/>}
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return (
    <View style={styles.recommendTitleWrap}>
      <Text style={styles.recommendTitle}>精选推荐</Text>
      <FlatList
        style={styles.typeListBox}
        horizontal
        data={typeList}
        renderItem={renderTypeItem}
        keyExtractor={item => item.labelId}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  recommendTitleWrap: {
    paddingTop: 4,
  },
  recommendTitle: {
    paddingRight: 12,
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
    marginBottom: 4,
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
})
