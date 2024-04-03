import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './screens/Splash';
import Home from './screens/Home';
import Search from './screens/Search';
import ViewPhoto from './screens/ViewPhoto';
import ViewVideo from './screens/ViewVideo';
import MyPhotos from './screens/MyPhotos';
const stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="ViewPhoto"
        component={ViewPhoto}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="ViewVideo"
        component={ViewVideo}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="MyPhotos"
        component={MyPhotos}
        options={{headerShown: false}}
      />
    </stack.Navigator>
  );
};
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="ViewPhoto"
          component={ViewPhoto}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="ViewVideo"
          component={ViewVideo}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="MyPhotos"
          component={MyPhotos}
          options={{headerShown: false}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
