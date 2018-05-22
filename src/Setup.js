import React, { Component }from 'react';
import {DeviceEventEmitter} from 'react-native';
import { StyleProvider } from 'native-base';
import App from './App';
import getTheme from "../native-base-theme/components"
import variables from "../native-base-theme/variables/commonColor"
import SplashScreen from "react-native-splash-screen";

export default class Setup extends Component{
    constructor(props){
        super(props);
        global.isLogin = false;
        global.localURL = "http://192.168.2.205:80";
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
                        alert(json.message);
                        userId = json.userData.id;
                        nickname = json.userData.nickname;
                        DeviceEventEmitter.emit('login');
                    })
                }else if (response.status === 500) {
                    response.json().then((json) => alert(json.error));
                }else if (response.status === 666) {
                    response.json().then((json) => alert(json.message));
                }
            })
            .catch((error) => {
                alert(error);
            });
        SplashScreen.hide();
    }

    render(){
        return (
            <StyleProvider style = {getTheme(variables)}>
                <App/>
            </StyleProvider>
        );
    }
}
