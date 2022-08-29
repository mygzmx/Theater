/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Entypo, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, ColorSchemeName, Pressable, Text, View } from 'react-native';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import Theater from '../screens/theater/Theater';
import Player from '../screens/player/Player';
import Drama from "../screens/drama/Drama";
import TabThreeScreen from '../screens/TabThreeScreen';
import { RootStackParamList, RootStackScreenProps, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator/>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Drama" component={Drama} options={({ navigation }: RootStackScreenProps<'Drama'>) => (
        {
          headerBackTitle: '返回',
          headerTitle: '我的追剧',
          headerTitleStyle: {color: '#FFFFFF'},
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'left',
          gestureEnabled: true, // 手势可操作
          headerStyle: { backgroundColor: '#0F0F0F'},
        }
      )}/>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const HomeHeader = (props: {title: string}) => (
    <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(15, 15, 15, 1)', display: 'flex', justifyContent: 'flex-end'}}>
      <Text style={{fontSize: 18, fontWeight: 'bold', color: '#BBBBBB', paddingLeft: 15, paddingBottom: 12}}>{props.title}</Text>
    </View>
  )
  return (
    <BottomTab.Navigator
      initialRouteName="Player"
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarBackground: () => <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(15, 15, 15, 1)'}}/>
      }}>
      <BottomTab.Screen
        name="Theater"
        component={Theater}
        options={({ navigation }: RootTabScreenProps<'Theater'>) => ({
          title: '剧场',
          headerTitleStyle: {
            opacity: 0
          },
          // headerTitleAlign: 'left',
          headerBackground: () => <HomeHeader title={'繁花剧场'}/>,
          tabBarIcon: ({ color }) => <Entypo name="grid" size={24} color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Player"
        component={Player}
        options={({ navigation }: RootTabScreenProps<'Player'>) => ({
          title: '在看',
          headerTitleStyle: {
            opacity: 0
          },
          tabBarIcon: ({ color }) => <AntDesign name="play" size={24} color={color} />,
          headerBackground: () => <HomeHeader title={'繁花剧场'}/>,
        })}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeScreen}
        options={({ navigation }: RootTabScreenProps<'TabThree'>) => (
          {
            title: '我的',
            headerTitleStyle: {
              opacity: 0
            },
            headerBackground: () => <HomeHeader title={'个人中心'}/>,
            tabBarIcon: ({ color }) => <AntDesign name="smileo" size={24} color={color} />,
          }
        )}
      />
    </BottomTab.Navigator>
  );
}
