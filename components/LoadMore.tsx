import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface IProps {
  loading: boolean;
  hasMore: boolean;
}

export default function LoadMore (props: IProps) {
  const { loading, hasMore } = props
  return <View style={styles.loadWrap}>
    {hasMore ?
      <View>
        {loading && <ActivityIndicator size="small" color="grey"/>}
        <Text style={styles.loadTxt}>{loading ? '正在加载中' : '上滑加载更多'}</Text>
      </View> :
      <Text style={styles.loadTxt}>没有更多了</Text>
    }
  </View>
}

const styles = StyleSheet.create({
  loadWrap: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadTxt: {
    marginTop:5,
    fontSize: 13,
    color: '#7F7F7F',
  }
})
