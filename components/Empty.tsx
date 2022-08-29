import { View, Text, Image, Dimensions } from "react-native";

const EmptyWhite = require('../assets/images/theater/empty-white.png')
const EmptyDark = require('../assets/images/theater/empty-dark.png')

interface IProps {
  theme?: 'white' | 'dark';
  message?: string;
}

const { width, height } = Dimensions.get('window');

export default function Empty ({theme = 'white', message = '暂无数据'}: IProps) {
  return <View style={{
    width: '100%',
    minWidth: 300,
    maxWidth: width,
    minHeight: 600,
    maxHeight: height,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <Image style={{
      width: 107,
      height: 90,
      marginBottom: 28,

    }} source={theme === 'white' ? EmptyWhite : EmptyDark} />
    {message && <Text style={{fontSize: 15, fontWeight: 'bold', color: '#9E9E9E'}}>{message}</Text>}
  </View>
}
