import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from "react-native-toast-notifications"; // 消息提示 which provides context for the Toast hook. --> useToast
import { Provider } from "react-redux";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from "./store";
import { initAxios } from "./apis/Service";
import { userInfoAsync } from "./store/modules/user.module";
import PrivacyPop from "./components/PrivacyPop";

initAxios(store);
store.dispatch(userInfoAsync());

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PrivacyPop/>
        <ToastProvider
          placement="bottom"
          duration={2500}
          animationType='zoom-in'
          animationDuration={250}
          normalColor={'#ffffff'}
          textStyle={{ fontSize: 12, color: '#333333' }}
          offset={70}
          swipeEnabled
        >
          <Provider store={store}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </Provider>
        </ToastProvider>
      </SafeAreaProvider>
    );
  }
}
