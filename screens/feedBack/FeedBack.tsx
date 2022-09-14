import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { netFeedBack } from "../../apis/Self";
import { regPhone } from "../../utils/reg";
import { RootStackScreenProps } from "../../@types";

export default function FeedBack ({ navigation }: RootStackScreenProps<'FeedBack'>) {

  const [tabList, setTabList] = useState<{content: string, active: boolean}[]>([
    { content:'更新慢', active:false },
    { content:'不流畅', active:false },
    { content:'耗流量', active:false },
    { content:'剧集少', active:false },
    { content:'价格高', active:false },
    { content:'界面少', active:false },
    { content:'提示少', active:false },
  ]);
  const [feedbackProblem, setFeedbackProblem] = useState('');
  const [feedbackMes, setFeedbackMes] = useState('');
  const [feedbackPhone, setFeedbackPhone] = useState('');
  const toast = useToast()
  const toggleActive = (index: number, active: boolean) => {
    setTabList(prevState => prevState.map((pre, ind) => {
      return ind === index ? { ...pre, active: !active } : pre;
    }));
    const arr: string[] = []
    tabList.forEach(element => {
      if(element.active){
        arr.push(element.content)
      }
    });
    setFeedbackProblem(arr.length > 0 ?  arr.join(',') : '');
  }

  const submitFeed = async () => {
    if (!feedbackProblem || !feedbackMes) {
      toast.show('请描述您遇到的问题');
      return;
    }
    if (!regPhone.test(feedbackPhone)) {
      toast.show('请输入正确的手机号码');
      return;
    }
    await netFeedBack(feedbackProblem, feedbackMes, feedbackPhone);
    toast.show('提交成功');
    setFeedbackProblem('');
    setFeedbackMes('')
    setFeedbackPhone('');
    navigation.goBack();
  }
  return <View style={styles.feedback}>
    <View style={styles.header}>
      <Text style={styles.title}>问题类型</Text>
      <View style={styles.tab}>
        { tabList.map((val, index) => (
          <Pressable
            key={val.content}
            style={{ ...styles.tabItem, backgroundColor: val.active ? '#fef1eb' : '#F8F8FA' }}
            onPress={() => toggleActive(index,val.active)}>
            <Text style={{ ...styles.tabItemTxt, color: val.active ? '#FF4B00' : '#191919' }}>{val.content}</Text>
          </Pressable>
        ))}
      </View>
      <View style={{ position: 'relative' }}>
        <TextInput
          style={styles.textInputMsg}
          multiline
          returnKeyType={"done"}
          blurOnSubmit
          textAlignVertical={"top"}
          textAlign={"left"}
          maxLength={200}
          placeholder="请简要说明您的问题"
          placeholderTextColor={"rgba(158, 158, 158, 1)"}
          value={feedbackMes}
          onChangeText={(text) => setFeedbackMes(text)}/>
        <Text style={styles.textNum}>{ feedbackMes.length }/200</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.bottomTitle}>联系方式</Text>
        <TextInput
          style={styles.textInputPhone}
          enablesReturnKeyAutomatically
          autoComplete='cc-number'
          textContentType={"telephoneNumber"}
          dataDetectorTypes='phoneNumber'
          keyboardType={"numeric"}
          maxLength={11}
          placeholder="请输入手机号以便回访"
          placeholderTextColor={"rgba(158, 158, 158, 1)"}
          value={feedbackPhone}
          returnKeyType={"done"}
          onChangeText={(text) => setFeedbackPhone(text)}/>
      </View>
    </View>
    <Pressable
      style={{
        ...styles.submitBtn,
        backgroundColor: feedbackMes && regPhone.test(feedbackPhone) && feedbackProblem ? 'rgba(255, 75, 0, 1)' : 'rgba(255, 75, 0, 0.2)'
      }}
      onPress={() => submitFeed()}>
      <Text style={styles.submitBtnTxt}>提交反馈</Text>
    </Pressable>
  </View>
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  feedback: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    paddingTop: 12,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 24,
  },
  title: {
    marginLeft: 15,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#191919',
  },
  tab: {
    paddingTop: 16,
    paddingBottom: 5,
    flexDirection: "row",
    flexWrap: 'wrap',
  },
  tabItem: {
    width: 73,
    height: 36,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: '#F8F8FA',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  tabItemTxt: {
    fontSize: 14,
    color: '#191919',
  },
  textInputMsg: {
    backgroundColor: 'rgba(248, 248, 250, 1)',
    height: 150,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 10,
    padding: 16,
    paddingTop: 16,
    borderRadius: 15,
    fontSize: 14,
  },
  textNum: {
    fontSize: 12,
    color: '#9E9E9E',
    position: 'absolute',
    bottom: 16,
    right: 28,
  },
  bottom: {
    marginTop: 24,
    paddingRight: 8,
    paddingLeft: 8,
  },
  bottomTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#191919',
  },
  textInputPhone: {
    padding: 16,
    paddingTop: 16,
    height: 54,
    backgroundColor: '#F8F8FA',
    borderRadius: 15,
    marginTop: 16,
    fontSize: 14,
  },
  submitBtn: {
    marginTop: 200,
    marginLeft: 23,
    width: width - 46,
    height: 50,
    backgroundColor: 'rgba(255, 75, 0, 1)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnTxt: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF',
  }
})
