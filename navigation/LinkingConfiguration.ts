/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { RootStackParamList } from '../@types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Theater: {
            screens: {
              TheaterScreen: 'Theater',
            },
          },
          Player: {
            screens: {
              PlayerScreen: 'Player',
            },
          },
          Self: {
            screens: {
              SelfScreen: 'Self',
            },
          },
        },
      },
      Modal: 'modal',
      Drama: 'Drama',
      ViewingRecords: 'ViewingRecords',
      FeedBack: 'FeedBack',
      AboutUs: 'AboutUs',
      TaskCheckIn: 'TaskCheckIn',
      Setting: 'Setting'
    },
  },
};

export default linking;
