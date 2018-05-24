import React, { Component }from 'react';
import {DeviceEventEmitter, BackHandler, ToastAndroid} from 'react-native';
import { StyleProvider } from 'native-base';
import App from './App';
import getTheme from "../native-base-theme/components"
import variables from "../native-base-theme/variables/commonColor"
import SplashScreen from "react-native-splash-screen";

export default class Setup extends Component{
    constructor(props){
        super(props);
        global.isLogin = false;
        global.localURL = "http://172.27.151.30:80";
        global.userId = null;
        global.nickname = null;
    }
    componentDidMount(){
        fetch(`${localURL}/signin/`,{
            method:'GET',
            credentials:'include',
        })
            .then((response) => {
                if (response.ok){
                    isLogin = true;
                    response.json().then((json) => {
                        ToastAndroid.show(json.message, ToastAndroid.SHORT);
                        userId = json.userData.id;
                        nickname = json.userData.nickname;
                        DeviceEventEmitter.emit('login');
                    })
                }else if (response.status === 500) {
                    response.json().then((json) => ToastAndroid.show(json.error, ToastAndroid.SHORT));
                }else if (response.status === 666) {
                    response.json().then((json) =>  ToastAndroid.show(json.message, ToastAndroid.SHORT));
                }
            })
            .catch((error) => {
                ToastAndroid.show(error, ToastAndroid.SHORT);
            });
        SplashScreen.hide();
    }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    };

    render(){
        return (
            <StyleProvider style = {getTheme(variables)}>
                <App/>
            </StyleProvider>
        );
    }
}
