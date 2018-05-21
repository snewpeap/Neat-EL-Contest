import React,{Component} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {Button, Container, Content, Form, Input, Item, Label, Text} from "native-base";

String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

export default class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:null,
            password:null,
            isError:false,
            tips:null,
        };
    }
    formatCheck(text:string, emitter){
        if (text === null || text.toString() == '' || text.toString().trim() == ' '){
            this.setState({
                isError:true,
                tips:`${emitter}不能为空!`,
            });
        }
    }
    onLoginButtonClick(){
        let userData = new FormData();
        userData.append("name",this.state.username);
        userData.append("password",this.state.password);
        fetch(`${localURL}/signin/`,{
            method:'POST',
            headers:{'Content-Type':'multipart/form-data',},
            body:userData,
            credentials:'include',
        })
            .then((response) => {
                if (response.ok){
                    isLogin = true;
                    response.json().then((json) => {
                        alert(json.message);
                        DeviceEventEmitter.emit('login');
                    })
                }else if (response.status === 500) {
                    response.json().then((json) => alert(json.error));
                }else if (response.status === 666) {
                    response.json().then((json) => alert(json.message));
                }
            })
            .catch((error) => {
                alert(error);
            })
    }
    render(){
        return(
            <Container>
                <Content>
                    <Form style={[{alignItems:'center'}]}>
                        <Item inlineLabel >
                            <Label>用户名</Label>
                            <Input
                                multiline={false}
                                onFocus={() => this.setState({isError:false})}
                                onChangeText={(text) => this.setState({username:text})}
                                onBlur={() => this.formatCheck(this.state.username, '用户名')}
                                onSubmitEditing={() => this.formatCheck(this.state.username, '用户名')}
                                value={this.state.username||''}
                            />
                        </Item>
                        <Item inlineLabel >
                            <Label>密码</Label>
                            <Input
                                multiline={false}
                                onFocus={() => this.setState({isError:false})}
                                onChangeText={(text) => this.setState({password:text})}
                                onBlur={() => this.formatCheck(this.state.password, '密码')}
                                onSubmitEditing={() => this.formatCheck(this.state.password, '密码')}
                                secureTextEntry={true}
                                value={this.state.password||''}
                            />
                        </Item>
                    </Form>
                    {this.state.isError?(
                        <Text style={[{margin:5, color:'red'}]}>{this.state.tips}</Text>
                    ):(null)}
                    <Button block
                            style={[{margin:5}]}
                            disabled={
                                this.state.username === null || this.state.username.toString().trim() == '' || this.state.password === null || this.state.password.toString().trim() == ''
                            }
                            onPress={() => this.onLoginButtonClick()}>
                        <Text>登陆</Text>
                    </Button>
                    <Button block transparent bordered
                            style={[{margin:5}]}
                            onPress={() => this.props.navigation.navigate('Register',{
                                callback:(params) => {
                                    this.setState({
                                        username:params.username,
                                        password:params.password,
                                    })
                                }})}>
                        <Text>注册</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
