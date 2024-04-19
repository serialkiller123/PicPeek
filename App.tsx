/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import mobileAds from 'react-native-google-mobile-ads';
import {AppOpenAd, TestIds, AdEventType} from 'react-native-google-mobile-ads';
import AppNavigator from './src/AppNavigator';

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
  });

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const adUnitId = __DEV__
  ? TestIds.APP_OPEN
  : 'ca-app-pub-1666861944997422/4630110539';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing', 'games'],
    });
    appOpenAd.load();

    const eventListener = appOpenAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        appOpenAd.show();
      },
    );
    appOpenAd.addAdEventListener(AdEventType.CLICKED, () => {
      appOpenAd.removeAllListeners();
    });

    return () => {
      eventListener();
      appOpenAd.removeAllListeners();
    };
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return <AppNavigator />;
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
