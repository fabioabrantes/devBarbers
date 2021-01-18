import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Appointments from '../screens/Appointments';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';

const {Navigator, Screen} = createBottomTabNavigator();

const MainTab = () => (
  <Navigator tabBar={(props) => <CustomTabBar {...props} />}>
    <Screen name="Home" component={Home} />
    <Screen name="Search" component={Search} />
    <Screen name="Appointments" component={Appointments} />
    <Screen name="Favorites" component={Favorites} />
    <Screen name="Profile" component={Profile} />
  </Navigator>
);

export default MainTab;
