import React, { Component } from 'react';
import {DeviceEventEmitter, Text, ToastAndroid,Platform} from "react-native";
import {Button, View} from "native-base";


export default class Social_wode extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    logout(){
        fetch(`${localURL}/signout/`,{
            method:'GET',
            credentials:'include',
        })
            .then((response) => {
                if (response.ok) {
                    isLogin = false;
                    userId = null;
                    nickname = null;
                    DeviceEventEmitter.emit('logout');
                }else {
                    response.json().then((json) => (Platform.OS === 'android'?ToastAndroid.show(json.error, ToastAndroid.SHORT) : alert(json.error)));
                }
            })
            .catch((error) => {
                Platform.OS === 'android'?ToastAndroid.show(error, ToastAndroid.SHORT) : alert(error)
            });
    }
    render(){
        return(
            <View>
                <Text>Welcome, {nickname}</Text>
                <Button style={[{alignItems:'center'}]} onPress={() => this.logout()}>
                    <Text>退出登录</Text>
                </Button>
            </View>
        )
    }
}
