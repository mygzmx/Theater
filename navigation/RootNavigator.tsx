import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList, RootStackScreenProps } from "../@types";
import Drama from "../screens/drama/Drama";
import ViewingRecords from "../screens/viewingRecords/ViewingRecords";
import NotFoundScreen from "../screens/NotFoundScreen";
import ModalScreen from "../screens/ModalScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import AboutUs from "../screens/about/AboutUs";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
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
          headerBackTitle: '返回',
          headerTintColor: '#0F0F0F',
          headerTitle: '观看记录',
          headerTitleAlign: 'left',
          gestureEnabled: true, // 手势可操作
          headerStyle: { backgroundColor: '#FFFFFF' },
        })}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={() => ({
          headerBackTitle: '返回',
          headerTintColor: '#0F0F0F',
          headerTitle: '关于我们',
          headerTitleAlign: 'left',
          gestureEnabled: true, // 手势可操作
          headerStyle: { backgroundColor: '#FFFFFF' },
        })}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }}/>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}
