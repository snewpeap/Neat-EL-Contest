import React, { Component } from 'react';
import {Button, Col, Container, Content, Form, Grid, Picker, Text, Textarea, View,} from 'native-base';
import {StyleSheet, DeviceEventEmitter, ToastAndroid, Platform, ImageBackground} from 'react-native';
import PostItem from '../postItem';

String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
const MAX = 50;
export default class Social_quanzi extends Component{
    constructor(props){
        super(props);
        this.state={
            typeSelected: 'normal',
            content:'',
            isWithin:true,
            posts:[],
        };
    }
    d1 = null;
    componentDidMount(){
        this.d1 = DeviceEventEmitter.addListener('socialflush',() => {
           this.onFlush();
        });
        this.onFlush();
    }
    onValueChange(value: string){
        this.setState({
            typeSelected: value,
        });
    }
    isBlank(str:String){
        return str == null || typeof str === "undefined" || str == "" || str.trim() == " ";
    }
    onFlush(){
        fetch(`${localURL}/posts?type=&author=&requestFavorite=`,{
            method:'GET',
            credentials:'include',
        })
            .then((response) => {
                if (response.ok){
                    response.json().then((response) => {
                        this.setState({
                            typeSelected:'normal',
                            posts:response.posts,
                        });
                    });
                } else {
                    response.json().then((json) => {
                        Platform.OS === 'android'?ToastAndroid.show(json.error, ToastAndroid.SHORT):alert(json.error)
                    });
                }
            })
            .catch((error) => {
                Platform.OS === 'android' ?ToastAndroid.show(error.message, ToastAndroid.SHORT) : alert(error.message)
            })
    }
    onDelete(id){
        fetch(`${localURL}/posts/${id}/remove/`,{
            method:'GET',
            credentials:'include',
        })
            .then((response) => {
                if (response.ok){
                    this.onFlush();
                    response.json().then((json) => {
                        Platform.OS === 'android' ? ToastAndroid.show(json.message, ToastAndroid.SHORT):alert(json.message)
                    })
                } else if (response.status === 500) {
                    response.json().then((json) => {Platform.OS === "android" ?ToastAndroid.show(json.error, ToastAndroid.SHORT) : alert(json.error)
                    });
                }
            }).catch((error) => {
                Platform.OS === 'android'?ToastAndroid.show(error.message, ToastAndroid.SHORT):alert(error.message)
            });
    }
    onFavorite(i,id,isFavorite,callback){
        fetch(`${localURL}/favorite/${id}/${isFavorite?'remove':'create'}/`,{
            method:isFavorite?'GET':'POST',
            credentials:'include',
        })
            .then((response) => {
                if (response.ok){
                    callback(true);
                    response.json().then((json) => {
                        Platform.OS === 'android' ? ToastAndroid.show(json.message, ToastAndroid.SHORT):alert(json.message)
                    })
                } else if (response.status === 500){
                    callback(false);
                    response.json().then((json) => {
                        Platform.OS === "android" ?ToastAndroid.show(json.error, ToastAndroid.SHORT) : alert(json.error)
                    });
                }
            }).catch((error) => {
            Platform.OS === 'android'?ToastAndroid.show(error.message, ToastAndroid.SHORT):alert(error.message)
        });
    }
    send(){
        let content = this.state.content.toString().replace(/[\n]/g, ' ');
        let tagArr = null;let tag = null;
        if (content.indexOf('#') !== -1) {
            if (content.match(/[#]/g).length % 2 === 1) {
                Platform.OS === 'android' ? ToastAndroid.show('标签格式错误', ToastAndroid.SHORT) : alert('标签格式错误');
                return;
            }
            tagArr = content.split('#');
            content = tagArr.pop();
            tagArr.shift();
            if (tagArr.length > 1){
                Platform.OS === 'android' ? ToastAndroid.show('限一个标签', ToastAndroid.SHORT) : alert('限一个标签');
                return;
            }
            if (this.isBlank(tagArr[0])){
                Platform.OS === 'android' ? ToastAndroid.show('不能有空标签', ToastAndroid.SHORT) : alert('不能有空标签');
                return;
            }
            tag = tagArr[0];
        }else {
            tag = '专注';
        }
        let post = new FormData();
        post.append('content', content);
        post.append('type', this.state.typeSelected);
        post.append('tag', tag);
        fetch(`${localURL}/posts/create`,{
            method:'POST',
            headers:{},
            body:post,
            credentials:'include',
        })
            .then((response) => {
                if (response.ok){
                    this.setState({content:''});
                    this.onFlush();
                    response.json().then((json) => {
                        Platform.OS === 'android'?ToastAndroid.show(json.message, ToastAndroid.SHORT):alert(json.message)
                    })
                } else if (response.status === 500) {
                    response.json().then((json) => {Platform.OS === 'android' ?ToastAndroid.show(json.error, ToastAndroid.SHORT) : alert(json.error)
                    });
                }
            })
            .catch((error) => {
                Platform.OS === 'android'?ToastAndroid.show(error.message, ToastAndroid.SHORT):alert(error.message)
            })
    }
    render(){
        return(
                <Container>
                    <Content>
                    <View style={[{flex: 1, backgroundColor: '#ddd'}]}>
                        <Form style={[{margin: 5}]}>
                            <Textarea rowSpan={3}
                                      placeholder={this.state.typeSelected === 'normal'?
                                          `刚刚完成了专注？分享一下吧！${MAX}字以内\n标签格式:#标签#正文`:
                                          `有什么好的经验？分享一下吧！${MAX}字以内\n标签格式:#标签#正文`}
                                      onChangeText={(text) => {
                                          this.setState({
                                              content: text,
                                              isWithin: text.length <= 50,
                                          });
                                      }}
                                      value={this.state.content}
                            />
                        </Form>
                        <Grid>
                            <Col style={[styles.col,{flex:3}]}>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={this.state.typeSelected}
                                    onValueChange={this.onValueChange.bind(this)}
                                    style={[{width: 100}]}
                                >
                                    <Picker.Item label="动态" value='normal'/>
                                    <Picker.Item label="经验" value='jingyan'/>
                                </Picker>
                            </Col>
                            <Col style={styles.bigcol}/>
                            <Col style={styles.col}>
                                <Text
                                    style={[{color: this.state.isWithin ? '#134' : 'red'}]}>{this.state.content.length}</Text>
                            </Col>
                            <Col style={styles.col}>
                                <Button disabled={!this.state.isWithin}
                                        onPress={() => this.send()}
                                >
                                    <Text>发送</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </View>
                    <View style={[{flex: 3,backgroundColor:'transparent'}]}>
                        {Object.keys(this.state.posts).length !== 0 ? (
                                    <View>
                                {
                                    this.state.posts.map((item, i) =>
                                        <PostItem first last
                                                  key={i} detail={item} favor={false}
                                                  onDelete={() => this.onDelete(item._id)}
                                                  onFavorite={(isFavorite,callback) => this.onFavorite(i,item._id,isFavorite,callback)}
                                        />)
                                }
                                </View>
                        ) : (
                                    <View style={[{flex: 1, alignItems: 'center',backgroundColor:'transparent'}]}>
                                        <Text>世界上还没有一条推文</Text>
                                    </View>
                        )
                        }
                        </View>
                    </Content>
                </Container>
        )
    }
}

const styles = StyleSheet.create({
    col:{
        backgroundColor:'#fff',
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1
    },
    bigcol:{
        flex:3,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderBottomWidth:1
    }
});
