import React, { Component } from 'react';
import {DeviceEventEmitter, Platform, StyleSheet,TouchableNativeFeedback,ToastAndroid} from "react-native";
import {Body, Button,, Text, Container, Content, Header, Icon, Left, List, ListItem, Right, Separator, View} from "native-base";


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
            <Container>
                <Header span style={{backgroundColor:'#3d2fff',flexDirection:'column'}}>
                    <View style={{flex:1, alignSelf:'center'}}>
                        <Text>给头像占个地</Text>
                    </View>
                    <View style={{flex:1, alignSelf:'center'}}>
                        <Text style={{fontSize:30,color:'#222',margin:10}}>{nickname}</Text>
                    </View>
                </Header>
                <Content>
                    <List>
                        <ListItem icon first last
                                  style={styles.listitem}
                                  background={TouchableNativeFeedback.SelectableBackground()}
                                  onPress={() => {
                                      this.props.navigation.navigate('MyPosts');
                                  }}
                        >
                            <Left>
                                <Icon name='person' style={{color:'#3d2fff'}}/>
                            </Left>
                            <Body>
                            <Text>我的推文</Text>
                            </Body>
                            <Right>
                                {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
                            </Right>
                        </ListItem>
                        <ListItem icon first last
                                  style={styles.listitem}
                                  background={TouchableNativeFeedback.SelectableBackground()}
                                  onPress={() => {
                                      this.props.navigation.navigate('MyFavorite');
                                  }}
                        >
                            <Left>
                                <Icon name='star' style={{color:'#fc4'}}/>
                            </Left>
                            <Body>
                            <Text>我的收藏</Text>
                            </Body>
                            <Right>
                                {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
                            </Right>
                        </ListItem>
                        <ListItem icon first last style={styles.listitem}>
                            <Left>
                                <Icon name='cog' style={{color:'#333'}}/>
                            </Left>
                            <Body>
                            <Text>设置</Text>
                            </Body>
                            <Right>
                                {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
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
