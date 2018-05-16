import React, { Component } from 'react';
import {
    Button,
    Container,
    Content, Text, View,
} from 'native-base';
import {DeviceEventEmitter} from 'react-native';
import LoginPage from './LoginPage'

class SocialPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            nickname:null,
        };
    }
    componentDidMount(){
        DeviceEventEmitter.addListener('login',(values) => {
            isLogin = true;
            this.setState({
                nickname:values.user,
            })
        });
    }
    logout(){
        isLogin = false;
        this.forceUpdate();
    }
    componentWillUnmount(){
        DeviceEventEmitter.remove();
    }
    render(){
        return (
            <Container>
                <Content>
                    {
                        !isLogin?(
                            <LoginPage navigation={this.props.navigation}/>
                        ):(
                            <View>
                                <Text>Welcome, {this.state.nickname}</Text>
                                <Button style={[{alignItems:'center'}]} onPress={() => this.logout()}>
                                    <Text>退出登录</Text>
                                </Button>
                            </View>
                        )
                    }
                </Content>
            </Container>
        );
    }
}

export default SocialPage;
