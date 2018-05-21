import React, { Component } from 'react';
import {
    Container,
    Content,
    } from 'native-base';
import {TabBarBottom, TabNavigator} from 'react-navigation';
import {Text} from "react-native";
import History from '../History';
import Statistics from '../Statistics';
import RegisterPage from "./registerPage";
import LoginPage from "./LoginPage";


const Tab = TabNavigator(
    {
        History:{
            screen : History,
            navigationOptions :{
                tabBarLabel:'List',
                tabBarIcon : ({focused}) => (
                    <Text style={{color: focused?'white':'#3d2fff', fontSize:18}}>列表</Text>
                )
            },
        },
        Statistics: {
            screen: Statistics,
            navigationOptions: {
                tabBarLabel:'Statistics',
                tabBarIcon: ({focused}) => (
                    <Text style={{color: focused?'white':'#3d2fff', fontSize:18}}>统计</Text>
                ),
            },
        }
    },
{
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'top',
    lazy: true,
    swipeEnabled: true,
    initialRouteName: 'History',
    tabBarOptions:{
    activeTintColor: 'white',
        inactiveTintColor: '#3d2fff',
        style:{
        backgroundColor: '#1d1150',
    },
}
},
);

class HistoryPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <Tab/>
        );
    }
}

export default HistoryPage;
