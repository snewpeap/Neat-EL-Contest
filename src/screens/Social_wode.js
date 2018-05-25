import React, { Component } from 'react';
import {DeviceEventEmitter, Platform, StyleSheet,TouchableNativeFeedback,ToastAndroid,ImageBackground,Image} from "react-native";
import {Body, Button, Text, Container, Content, Header, Icon, Left, List, ListItem, Right, Separator, View} from "native-base";


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
                Platform.OS === 'android'?ToastAndroid.show(error.message, ToastAndroid.SHORT) : alert(error.message)
            });
    }
    render(){
        return(
            <Container>
                <View style={{height:30}}/>
                    <View style={{height:20,alignItems:'center'}}>
                        <Text style={{
                            fontSize:30,
                            color:'#222',
                            textShadowOffset:{width:2,height:1},
                            textShadowRadius:2,
                            textShadowColor:'grey' }}
                        >你好,{nickname}</Text>
                    </View>
                <View style={{height:30}}/>
                <Content>
                    <List>
                                <ListItem icon first last
                                          style={styles.listitem}
                                          background={TouchableNativeFeedback.SelectableBackground()}
                                          onPress={() => {
                                              this.props.navigation.navigate('MyPosts',{
                                                  callback:(params) => {
                                                      DeviceEventEmitter.emit('socialflush');
                                                  }});
                                          }}
                                >
                            <Left>
                                <Icon name='person' style={{color:'#3d2fff'}}/>
                            </Left>
                            <Body>
                            <Text>我的推文</Text>
                            </Body>
                            <Right>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon first last
                                  style={styles.listitem}
                                  background={TouchableNativeFeedback.SelectableBackground()}
                                  onPress={() => {
                                      this.props.navigation.navigate('MyFavorite',{
                                          callback:(params) => {
                                              DeviceEventEmitter.emit('socialflush');
                                          }});
                                  }}
                        >
                            <Left>
                                <Icon name='star' style={{color:'#fc4'}}/>
                            </Left>
                            <Body>
                            <Text>我的收藏</Text>
                            </Body>
                            <Right>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>

                        <Separator style={styles.separator}/>

                        <ListItem button first last
                                  style={styles.listitem}
                                  background={TouchableNativeFeedback.SelectableBackground()}
                                  onPress={() => {
                                      this.logout();
                                  }}
                        >
                            <Body>
                            <Text style={{color:'red',textAlign:'center'}}>退出登录</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    listitem:{
        backgroundColor:'white',
    },
    separator:{
        backgroundColor:'transparent',
    }
});
