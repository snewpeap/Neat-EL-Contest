import React, { Component }from 'react';
import Storage from 'react-native-storage';
import {AsyncStorage, DeviceEventEmitter} from 'react-native';
import { StyleProvider } from 'native-base';
import App from './App';
import getTheme from "../native-base-theme/components"
import variables from "../native-base-theme/variables/commonColor"
import SplashScreen from "react-native-splash-screen";


let storage = new Storage({
    size: 100,
    storageBackend: AsyncStorage,
    defaultExpires: 2592000000,
});

export default class Setup extends Component{
    componentDidMount() {
        SplashScreen.hide();
    }
    constructor(props){
        super(props);
        global.storage = storage;
        global.isLogin = false;
        global.localURL = "http://101.132.114.36:80";
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
            })
    }


    render(){
        return (
            <StyleProvider style = {getTheme(variables)}>
                <App/>
            </StyleProvider>
        );
    }
}
