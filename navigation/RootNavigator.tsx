import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList, RootStackScreenProps } from "../@types";
import Drama from "../screens/drama/Drama";
import ViewingRecords from "../screens/viewingRecords/ViewingRecords";
import AboutUs from "../screens/about/AboutUs";
import FeedBack from "../screens/feedBack/FeedBack";
import TaskCheckIn from "../screens/task/TaskCheckIn";
import Setting from "../screens/setting/Setting";
import LoginPrivacy from "../screens/loginPrivacy/LoginPrivacy";
import BottomTabNavigator from "./BottomTabNavigator";
import Wallet from "../screens/wallet/Wallet";

const whiteOptions = (headerTitle: string): { headerTitleAlign: string; headerBackTitle: string; headerTintColor: string; gestureEnabled: boolean; headerTitle: string; headerStyle: { backgroundColor: string } } => ({
  headerBackTitle: '返回',
  headerTintColor: '#0F0F0F',
  headerTitle,
  headerTitleAlign: 'left',
  gestureEnabled: true, // 手势可操作
  headerStyle: { backgroundColor: '#FFFFFF' },
})

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginPrivacy"
        component={LoginPrivacy}
        options={({ navigation }: RootStackScreenProps<'LoginPrivacy'>) => ({
          headerShown: false,
        })}/>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }}/>
      <Stack.Screen
        navigationKey="Drama"
        name="Drama"
        component={Drama}
        options={({ navigation }: RootStackScreenProps<'Drama'>) => ({
          headerBackTitle: '返回',
          headerTitle: '我的追剧',
          headerTitleStyle: { color: '#FFFFFF' },
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'left',
          gestureEnabled: true, // 手势可操作
          headerStyle: { backgroundColor: '#0F0F0F' },
        })}/>
      <Stack.Screen
        name="ViewingRecords"
        component={ViewingRecords}
        options={() => ({
          ...whiteOptions('观看记录'),
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={() => ({
          ...whiteOptions('关于我们'),
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name="FeedBack"
        component={FeedBack}
        options={() => ({
          ...whiteOptions('意见反馈'),
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name="TaskCheckIn"
        component={TaskCheckIn}
        options={() => ({
          ...whiteOptions('任务和签到'),
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={() => ({
          ...whiteOptions('设置'),
          headerTitleAlign: 'left',
        })}
      />
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={({ navigation }: RootStackScreenProps<'Wallet'>) => ({
          ...whiteOptions('我的账户'),
          headerTitleAlign: 'left',
        })}/>
    </Stack.Navigator>
  );
}
