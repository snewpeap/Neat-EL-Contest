import React, { Component }from 'react';
import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';
import { StyleProvider } from 'native-base';
import App from './App';
import getTheme from "../native-base-theme/components"
import variables from "../native-base-theme/variables/commonColor"

var historyStorage = new Storage({
    size:1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
});

export default class Setup extends Component{
    constructor(props){
        super(props);
        global.historyStorage = historyStorage;
        global.localURL = "http://localhost:8081/historyData.json";
    }
    render(){
        return (
            <StyleProvider style = {getTheme(variables)}>
                <App/>
            </StyleProvider>
        );
    }
}
