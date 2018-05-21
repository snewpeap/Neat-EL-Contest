import React, { Component } from 'react';
import {
    Button,
    Container,
    Content, Root, Text, View,
} from 'native-base';
import {TabBarBottom, TabNavigator} from 'react-navigation';
import {DeviceEventEmitter} from 'react-native';
import LoginPage from './LoginPage'
import Social_wode from '../Social_wode'
import Statistics from "../Statistics";
import History from "../History";
import Social_quanzi from '../Social_quanzi'


const Tab = TabNavigator(
    {
        Social_wode:{
            screen : Social_wode,
            navigationOptions :{
                tabBarLabel:'Mine',
                tabBarIcon : ({focused}) => (
                    <Text style={{color: focused?'white':'#3d2fff', fontSize:18}}>我的</Text>
                )
            },
        },
        Social_quanzi: {
            screen: Social_quanzi,
            navigationOptions: {
                tabBarLabel:'Moments',
                tabBarIcon: ({focused}) => (
                    <Text style={{color: focused?'white':'#3d2fff', fontSize:18}}>圈子</Text>
                ),
            },
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'top',
        lazy: true,
        swipeEnabled: true,
        initialRouteName: 'Social_wode',
        tabBarOptions:{
            activeTintColor: 'white',
            inactiveTintColor: '#3d2fff',
            style:{
                backgroundColor: '#1d1150',
            },
        }
    },
);
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
                    !isLogin?(
                            <Container>
                                <Content>
                            <LoginPage navigation={this.props.navigation}/>
                            </Content>
                        </Container>
                        ):(
                            <Container>
                            <Text>Welcome, {this.state.nickname}</Text>
                            <Button style={[{alignItems:'center'}]} onPress={() => this.logout()}>
                                <Text>退出登录</Text>
                            </Button>
                            <Tab/>
                            </Container>
                        )
        );
    }
}

export default SocialPage;
