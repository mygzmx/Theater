/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import {  NativeStackScreenProps } from '@react-navigation/native-stack';
import PrivacyPop from "../screens/loginPrivacy/PrivacyPop";
import LoginPrivacy from "../screens/loginPrivacy/LoginPrivacy";

declare global {
  export namespace ReactNavigation {
    interface RootParamList extends RootStackParamList, RootTabParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList>;
  Drama: undefined;
  ViewingRecords: undefined;
  AboutUs: undefined;
  FeedBack: undefined;
  TaskCheckIn: undefined;
  Setting: undefined;
  LoginPrivacy: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Theater: undefined;
  Player: undefined;
  Self: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
