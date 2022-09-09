import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import * as React from "react";
import { RootTabParamList, RootTabScreenProps } from "../@types";
import Theater from "../screens/theater/Theater";
import Player from "../screens/player/Player";
import Self from "../screens/self/Self";

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const HomeHeader = (props: { title: string }) => (
    <View style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(15, 15, 15, 1)',
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#BBBBBB',
        paddingLeft: 15,
        paddingBottom: 12
      }}>{props.title}</Text>
    </View>
  );
  return (
    <BottomTab.Navigator
      initialRouteName="Theater"
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 25,
          borderTopWidth: 0,
        },
        headerStyle: {
          height: 90,
        },
        tabBarLabelStyle: {
          fontSize: 18,
          // color: '#7F7F7F',
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarIcon: () => null,
        tabBarBackground: () => <View
          style={{ width: '100%', height: '100%', backgroundColor: 'rgba(15, 15, 15, 1)' }}/>
      }}>
      <BottomTab.Screen
        navigationKey="Player"
        name="Theater"
        component={Theater}
        options={({ navigation }: RootTabScreenProps<'Theater'>) => ({
          title: '剧场',
          headerTitleStyle: {
            opacity: 0
          },
          headerBackground: () => <HomeHeader title={'繁花剧场'}/>,
          // tabBarIcon: ({ color }) => <Entypo name="grid" size={24} color={color}/>,
        })}
      />
      <BottomTab.Screen
        navigationKey="Player"
        name="Player"
        component={Player}
        options={({ navigation }: RootTabScreenProps<'Player'>) => ({
          title: '在看',
          headerTitleStyle: {
            opacity: 0
          },
          // tabBarIcon: ({ color }) => <AntDesign name="play" size={24} color={color}/>,
          headerBackground: () => <HomeHeader title={'繁花剧场'}/>,
        })}
      />
      <BottomTab.Screen
        navigationKey="Self"
        name="Self"
        component={Self}
        options={({ navigation }: RootTabScreenProps<'Self'>) => (
          {
            title: '我的',
            headerTitleStyle: {
              opacity: 0
            },
            headerBackground: () => <HomeHeader title={'个人中心'}/>,
            // tabBarIcon: ({ color }) => <AntDesign name="smileo" size={24} color={color}/>,
          }
        )}
      />
    </BottomTab.Navigator>
  );
}
