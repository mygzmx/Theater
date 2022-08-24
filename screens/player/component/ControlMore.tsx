import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { netChapterList } from "../../../apis/Player";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface IProps {

}

const ControlMore = (props: IProps) => {
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(30);
  const [bookName, setBookName] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [chapterList, setChapterList] = useState([]);
  const { bookId, chapterId } = useSelector((state: RootState) => (state.player));
  useEffect(() => {
    if (bookId) {
      getChapterList()
    }
  }, [bookId]);
  
  const getChapterList = async () => {
    const { chapterList = [], bookName } = await netChapterList({
      bookId,
      startIndex,
      endIndex
    });
    setBookName(bookName);
    setChapterList(chapterList);
    const name = chapterList.find((chap: any) => chap.id === chapterId)?.chapterName || '';
    setChapterName(name)
  }
  return <View style={styles.moreWrap}>
    <Text style={styles.bookName}>{bookName}</Text>
    <Text style={styles.bookName}>{chapterName}</Text>
  </View>
}

const styles = StyleSheet.create({
  moreWrap: {
    height: 40,
    backgroundColor: 'yellow',
  },
  bookName: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  }
})

export default ControlMore;