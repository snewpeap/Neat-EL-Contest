import React, { Component } from 'react';
import {DeviceEventEmitter} from 'react-native';
import History from '../History';

class HistoryPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    d1 = null;d2 = null;d3 = null;
    componentDidMount(){
        this.d1 = DeviceEventEmitter.addListener('login',() => {
            this.forceUpdate();
        });
        this.d2 = DeviceEventEmitter.addListener('logout',() => {
            this.forceUpdate();
        });
        this.d3 = DeviceEventEmitter.addListener('jumpToLogin',() => {
            this.props.navigation.navigate('SocialPage')
        })
    }
    componentWillUnmount(){
        this.d1.remove();this.d2.remove();this.d3.remove();
    }
    render(){
        return (
            <History/>
        );
    }
}

export default HistoryPage;
