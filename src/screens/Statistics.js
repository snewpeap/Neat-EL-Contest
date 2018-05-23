import React, {Component} from 'react';
import {Button, Container, Content, Text, View} from "native-base";
import {DeviceEventEmitter} from "react-native";


export default class Statistics extends Component{
    constructor(props){
        super(props);
    };
    render(){
        return(
            <Container>
                <Content>
                    {isLogin?
                        <Text>这是统计</Text>:
                        <View>
                            <Text>你还没有登陆</Text>
                            <Text>不登陆你能变强吗？</Text>
                            <Button onPress={() => DeviceEventEmitter.emit('jumpToLogin')}>
                                <Text>去登陆</Text>
                            </Button>
                        </View>
                    }
                </Content>
            </Container>
        )
    }
};
