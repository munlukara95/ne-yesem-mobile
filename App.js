/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {Box, Center, NativeBaseProvider} from "native-base";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import Dining from "./public/icon/dining.svg";
import Shuffle from "./public/icon/shuffle.svg";
import DiningScreen from "./src/screen/dining-screen";
import ShuffleScreen from "./src/screen/shuffle-screen";
import {LogBox, Platform} from 'react-native';
import SplashScreen from "./src/screen/splash-screen";

// Ignore log notification by message:
LogBox.ignoreLogs(['']);

const Tab = createBottomTabNavigator();

const App: () => Node = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [timerId, setTimerId] = useState(-1);

  useEffect(() => {
      setTimerId(setTimeout(() => {
          setIsAppReady(true);
      }, 1000));

      return () => {
          clearTimeout(timerId);
      }
  }, []);

  return (
      <SplashScreen isAppReady={isAppReady} >
          <NativeBaseProvider>
              <NavigationContainer>
                  <Tab.Navigator
                      screenOptions={({ route }) => ({
                          tabBarActiveTintColor: 'tomato',
                          tabBarInactiveTintColor: '#acacac',
                          headerShown: false,
                          tabBarShowLabel: false,
                          tabBarStyle: { position: 'absolute', height: 70,
                              bottom: 25, borderRadius: 30, marginLeft: 5 + '%', marginRight: 5 + '%',
                              backgroundColor: '#fff', shadowColor: "#000",
                              shadowOffset: {
                                  width: 0,
                                  height: 2,
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 3.84,
                              elevation: 5, },
                          tabBarHideOnKeyboard: false,
                      })}
                  >
                      <Tab.Screen lazy={false} name="Dining" component={DiningScreen} options={{
                          tabBarIcon: ({color, size}) => {
                              if(Platform.OS === 'ios'){
                                  return <Box mt={8}>
                                      <Dining width={size} height={size} fill={color} />
                                  </Box>;
                              } else if(Platform.OS === 'android'){
                                  return <Dining width={size} height={size} fill={color} />;
                              }
                          }
                      }}/>
                      <Tab.Screen lazy={false} name="Shuffle" component={ShuffleScreen} options={{
                          tabBarIcon: ({color, size}) => {
                              if(Platform.OS === 'ios'){
                                  return <Box mt={8}>
                                      <Shuffle width={size} height={size} fill={color} />
                                  </Box>;
                              } else if(Platform.OS === 'android'){
                                  return <Shuffle width={size} height={size} fill={color} />;
                              }
                          }
                      }}/>
                  </Tab.Navigator>
              </NavigationContainer>
          </NativeBaseProvider>
      </SplashScreen>
  );
};


export default App;
