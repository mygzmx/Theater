import { StyleSheet, View } from "react-native";
import Player from "../player/Player";

export default function SecondaryPlayer () {
  return <View style={styles.secondaryWrap}>
    <Player/>
    <View style={styles.footer}/>
  </View>
}

const styles = StyleSheet.create({
  secondaryWrap: {
    flex: 1,
    backgroundColor: 'rgba(15, 15, 15, 1)',
  },
  footer: {
    height: 60,
  },
})
