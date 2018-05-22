import React, { Component }from 'react';
import Storage from 'react-native-storage';
import {AsyncStorage, BackHandler, ToastAndroid} from 'react-native';
import { StyleProvider } from 'native-base';
import App from './App';
import getTheme from "../native-base-theme/components"
import variables from "../native-base-theme/variables/commonColor"
import SplashScreen from "react-native-splash-screen";


let historyStorage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
});

export default class Setup extends Component{
    componentDidMount() {
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

    constructor(props){
        super(props);
        global.historyStorage = historyStorage;
        global.isLogin = false;
        global.localURL = "http://localhost:8081/Data.json";
    }


    render(){
        return (
            <StyleProvider style = {getTheme(variables)}>
                <App/>
            </StyleProvider>
        );
    }
}
