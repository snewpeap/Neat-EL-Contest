import React, { Component } from 'react';
import {
    Button,
    Container,
    Content, Text, View,
} from 'native-base';
import {DeviceEventEmitter} from 'react-native';
import History from '../History';

class HistoryPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    d1 = null;d2 = null;
    componentDidMount(){
        this.d1 = DeviceEventEmitter.addListener('login',() => {
            this.forceUpdate();
        });
        this.d2 = DeviceEventEmitter.addListener('logout',() => {
            this.forceUpdate();
        })
    }
    componentWillUnmount(){
        this.d1.remove();this.d2.remove();
    }
    render(){
        return (
            <Container>
                <Content>
                    {isLogin?
                        <History/>:
                        <View>
                            <Text>你还没有登陆</Text>
                            <Text>不登陆你能变强吗？</Text>
                            <Button onPress={() => this.props.navigation.navigate('SocialPage')}>
                                <Text>去登陆</Text>
                            </Button>
                        </View>
                    }
                </Content>
            </Container>
        );
    }
}

export default HistoryPage;
