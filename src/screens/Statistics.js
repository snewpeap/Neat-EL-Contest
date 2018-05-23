import React, {Component} from 'react';
import {Button, Container, Content, Text, View} from "native-base";
import {DeviceEventEmitter} from "react-native";


export default class Statistics extends Component{
    constructor(props){
        super(props);
        this.state={};
    };
    d1 = null;d2 = null;
    componentDidMount(){
        this.d1 = DeviceEventEmitter.addListener('login',() => this.forceUpdate());
        this.d2 = DeviceEventEmitter.addListener('logout',() => this.forceUpdate())
    }
    componentWillUnmount(){
        this.d1.remove();this.d2.remove();
    }
    render(){
        return(
            <Container>
                <Content>
                    {isLogin?
                        (<View style={[{flex:1, alignItems:'center'}]}>
                            <Text>这是统计</Text>
                        </View>
                        ): (
                            <View>
                            <Text>你还没有登陆</Text>
                            <Text>不登陆你能变强吗？</Text>
                            <Button onPress={() => DeviceEventEmitter.emit('jumpToLogin')}>
                                <Text>去登陆</Text>
                            </Button>
                        </View>
                        )
                    }
                </Content>
            </Container>
        )
    }
};
