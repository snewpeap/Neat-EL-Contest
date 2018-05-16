import React, { Component } from 'react';
import {Icon, Root} from 'native-base';
import {StackNavigator, TabBarBottom, TabNavigator} from 'react-navigation';
import HistoryPage from "./screens/HistoryPage";
import TimerPage from "./screens/TimerPage";
import SocialPage from "./screens/SocialPage";
import RegisterPage from './screens/registerPage';
import LoginPage from "./screens/LoginPage";

const Tab = TabNavigator(
    {
        HistoryPage:{
            screen: HistoryPage,
            navigationOptions:{
                tabBarLabel: 'History',
                tabBarIcon: ({focused}) => (
                    <Icon name = 'paper' style={{color: focused?'white':'#ddaa99'}}/>
                )
            },
        },
        TimerPage:{
            screen: TimerPage,
            navigationOptions:{
                tabBarLabel: 'Timer',
                tabBarIcon: ({focused}) => (
                    <Icon name = 'alarm' style={{color: focused?'white':'#ddaa99'}}/>
                )
            },
        },
        SocialPage:{
            screen: SocialPage,
            navigationOptions:{
                tabBarLabel: 'Social',
                tabBarIcon: ({focused}) => (
                    <Icon name = 'person' style={{color: focused?'white':'#ddaa99'}}/>
                )
            },
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
        Tab: {
            screen: Tab,
        },
        Login:{
            screen: LoginPage,
        },
        Register: {
            screen: RegisterPage,
            navigationOptions:{
                headerTitle:'注册',
                headerTitleStyle:{
                    alignSelf:'center',
                }
            },
        }
    },
    {
        initialRouteName: 'Tab',
        headerMode: 'none',
    }
);

export default class App extends Component{
    render(){
        return(
            <Root>
                <Nav/>
            </Root>
        );
    }
}
