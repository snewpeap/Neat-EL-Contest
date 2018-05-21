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
    d1 = null;d2 = null;
    componentDidMount(){
        this.d1 = DeviceEventEmitter.addListener('login',() => {
            this.forceUpdate();
        });
        this.d2 = DeviceEventEmitter.addListener('logout',() => {
            this.forceUpdate();
        })
    }
    logout(){
        fetch(`${localURL}/signout/`,{
            method:'GET',
            credentials:'include',
        })
            .then((response) => {
                if (response.ok) {
                    isLogin = false;
                    DeviceEventEmitter.emit('logout');
                }else {
                    response.json().then((json) => alert(json.error));
                }
            })
            .catch((error) => {
                alert(error);
            });
    }
    componentWillUnmount(){
        this.d1.remove();this.d2.remove();
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
                                <Text>Welcome</Text>
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
