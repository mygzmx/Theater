import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { netChapterList } from "../../../apis/Player";
import { useRoute } from "@react-navigation/native";

interface IProps {

}

const ControlMore = (props: IProps) => {
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(30);
  const [bookName, setBookName] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [chapterList, setChapterList] = useState([]);
  const route = useRoute();
  useEffect(() => {
    if (route.params) {
      const { bookId, chapterId } = route.params as { bookId: string; chapterId: string };
      setChapterId(chapterId);
      getChapterList(bookId)
    }
  }, [route]);
  
  const getChapterList = async (bookId: string) => {
    const { chapterList, bookName } = await netChapterList({
      bookId,
      startIndex,
      endIndex
    });
    console.log('bookName---------__>', bookName)
    setBookName(bookName);
    setChapterList(chapterList);
    const name = chapterList.find((chap: any) => chap.id === chapterId).chapterName || '';
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