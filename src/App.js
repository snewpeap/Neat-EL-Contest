import React, { Component } from 'react';
import {Icon} from 'native-base';
import {StackNavigator, TabBarBottom, TabNavigator} from 'react-navigation';
import HistoryPage from "./screens/HistoryPage";
import TimerPage from "./screens/TimerPage";
import SocialPage from "./screens/SocialPage";

const Tab = TabNavigator(
    {
        HistoryPage:{
            screen: HistoryPage,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'History',
                tabBarIcon: ({focused}) => (
                    <Icon name = 'paper' style={{color: focused?'white':'#ddaa99'}}/>
                )
            }),
        },
        TimerPage:{
            screen: TimerPage,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Timer',
                tabBarIcon: ({focused}) => (
                    <Icon name = 'alarm' style={{color: focused?'white':'#ddaa99'}}/>
                )
            }),
        },
        SocialPage:{
            screen: SocialPage,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Social',
                tabBarIcon: ({focused}) => (
                    <Icon name = 'person' style={{color: focused?'white':'#ddaa99'}}/>
                )
            }),
        },
    },

    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        lazy: true,
        swipeEnabled: true,
        initialRouteName: 'TimerPage',
        tabBarOptions:{
            activeTintColor: 'white',
            inactiveTintColor: '#ddaa99',
            style:{
                backgroundColor: '#ff4000',
            },
        }
    },
);

const Nav = StackNavigator(
    {
        //MainPage: { screen: MainPage },
        //HistoryPage: {screen: HistoryPage },
        //TimerPage: { screen: TimerPage },
        //SocialPage: { screen: SocialPage },
        Tab: {screen: Tab}
    },
    {
        //initialRouteName: 'MainPage',
        //initialRouteName: 'TimerPage',
        initialRouteName: 'Tab',
        headerMode: 'none',
        header: 'null',
    }
);

export default class App extends Component{
    render(){
        return(
            <Nav/>
        );
    }
}
