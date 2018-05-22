import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Container, Content, Header, Input, Item, Label, Text} from "native-base";

String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

export default class RegisterPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:null,
            nickname:null,
            password:null,
            passwordAgain:null,
            tip1:null,
            tip2:null,
            expectCorrect:{
                usernameIsOK:false,
                passwordIsOK:false,
                nicknameIsOK:false,
                passwordIsConfirm:false,
            },
            isAbleToCommit:false,
        };
    }
    check(emitter:string){
        switch (emitter){
            case 'username':
                this.setState({
                    expectCorrect:Object.assign(
                        {},
                        this.state.expectCorrect,
                        {usernameIsOK:(!(this.isBlank(this.state.username)||this.usernameFormatCheck()))}
                        )
                });
                break;
            case 'password':
                this.setState({expectCorrect:Object.assign(
                        {},
                        this.state.expectCorrect,
                        {passwordIsOK:(!(this.isBlank(this.state.password)||this.passwordFormatCheck()))}
                    )
                });
                break;
            case 'again':
                this.setState({expectCorrect:Object.assign(
                        {},
                        this.state.expectCorrect,
                        {passwordIsConfirm:(!(this.isBlank(this.state.passwordAgain)||this.state.password != this.state.passwordAgain))}
                    )
                });
                break;
            case 'nickname':
                this.setState({expectCorrect:Object.assign(
                        {},
                        this.state.expectCorrect,
                        {nicknameIsOK:(!(this.isBlank(this.state.nickname)))}
                    )});
                break;
            default:
                break;
        }
        let flag = true;
        Object.keys(this.state.expectCorrect).forEach((key) => {
            if (this.state.expectCorrect[key] === false){
                this.setState({isAbleToCommit:false});
                flag = false;
            }
        });
        if (flag) {this.setState({isAbleToCommit:true});}
    }
    isBlank(str:String){
        return str == null || typeof str === "undefined" || str == "" || str.trim() == " ";
    }
    usernameFormatCheck(){
        const pattern = /^[A-z]{5,20}$/;
        this.setState({tip1:pattern.test(this.state.username)?null:'用户名不符合格式：纯英文字母！'});
        return !pattern.test(this.state.username);
    }
    passwordFormatCheck(){
        const pattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
        this.setState({tip2:pattern.test(this.state.password)?null:'密码不符合格式:至少一个大写字母、一个小写字母、一个数字！'});
        return !pattern.test(this.state.password);
    }
    render(){
        return(
            <Container>
                <Header>
                    <Text style={{fontSize:34,fontWeight : 'bold'}}>注册</Text>
                </Header>
                <Content>
                    <Item regular style={styles.itemStyle}>
                        <Label style={styles.font}>用户名:</Label>
                        <Input
                            multiline={false}
                            placeholder='5位以上的字母组合'
                            onChangeText={(text) => this.setState({username:text})}
                            onBlur={() => this.check('username')}
                            onSubmitEditing={() => this.check('username')}
                            style={styles.textAreaStyle}
                        />
                    </Item>
                    {this.state.tip1 === null?null:<Text style={[{color:'red'}]}>{this.state.tip1}</Text>}
                    <Item regular style={styles.itemStyle}>
                        <Label style={styles.font}>密码:</Label>
                        <Input secureTextEntry
                               multiline={false}
                               placeholder='6位以上大小写字母与数字组合'
                               onChangeText={(text) => this.setState({password:text})}
                               onBlur={() => this.check('password')}
                               onSubmitEditing={() => this.check('password')}
                               style={styles.textAreaStyle}
                        />
                    </Item>
                    {this.state.tip2 === null?null:<Text style={[{color:'red'}]}>{this.state.tip2}</Text>}
                    <Item regular style={styles.itemStyle}>
                        <Label style={styles.font}>再次确认密码:</Label>
                        <Input secureTextEntry
                               multiline={false}
                               editable={!this.isBlank(this.state.password)}
                               placeholder='请再次输入您的密码'
                               onChangeText={(text) => this.setState({passwordAgain:text})}
                               onBlur={() => this.check('again')}
                               onSubmitEditing={() => this.check('again')}
                               style={styles.textAreaStyle}/>
                    </Item>
                    {this.state.expectCorrect.passwordIsConfirm?null:<Text style={[{color:'red'}]}>两次输入的密码不同！</Text>}
                    <Item regular style={styles.itemStyle}>
                        <Label style={styles.font}>昵称:</Label>
                        <Input multiline={false}
                               editable={!(this.isBlank(this.state.password)||this.isBlank(this.state.username))}
                               style={styles.textAreaStyle}
                               onChangeText={(text) => this.setState({nickname:text})}
                               onBlur={() => this.check('nickname')}
                               onSubmitEditing={() => this.check('nickname')}
                        />
                    </Item>
                    {this.state.expectCorrect.nicknameIsOK?null:<Text style={[{color:'red'}]}>昵称不能为空！</Text>}
                    <Button block
                            disabled={!this.state.isAbleToCommit}
                            style={[{margin:5}]}
                            onPress={() => {
                                this.props.navigation.state.params.callback({
                                    username:this.state.username,
                                    password:this.state.password,
                                    nickname:this.state.nickname,
                                });
                                this.props.navigation.goBack();
                            }}>
                        <Text>提交注册</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    itemStyle:{
        marginTop:10,
        marginBottom:10,
    },
    textAreaStyle:{
        height:50,
    },
    font:{
        fontSize:12,
    }
});
