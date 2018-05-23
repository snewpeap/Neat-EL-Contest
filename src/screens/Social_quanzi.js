import React, { Component } from 'react';
import {Button, Col, Container, Content, Form, Grid, Input, Item, Picker, Text, Textarea, View,} from 'native-base';
import {StyleSheet, ToastAndroid,Platform} from 'react-native';
import PostItem from '../postItem';

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
    componentDidMount(){
        this.onFlush();
    }
    onValueChange(value: string){
        this.setState({
            typeSelected: value,
        });
    }
    onFlush(){
        fetch(`${localURL}/posts?type=&author=`,{
            method:'GET',
            credentials:'include',
        })
            .then((response) => {
                if (response.ok){
                    response.json().then((response) => {
                        this.setState({
                            posts:response.posts,
                        })
                    });
                } else {
                    response.json().then((json) => (Platform.OS === 'android'?ToastAndroid.show(json.error, ToastAndroid.SHORT):alert(json.error)));
                }
            })
            .catch((error) => {
                Platform.OS === 'android' ?ToastAndroid.show(error, ToastAndroid.SHORT) : alert(error)
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
                    response.json().then((json) => (Platform.OS === "android" ?ToastAndroid.show(json.error, ToastAndroid.SHORT) : alert(json.error)));
                }
            })
            .catch((error) => {
                Platform.OS === 'android'?ToastAndroid.show(error, ToastAndroid.SHORT):alert(error)
            });
    }
    send(){
        let post = new FormData();
        post.append('content', this.state.content);
        post.append('type', this.state.typeSelected);
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
                    response.json().then((json) => (Platform.OS === 'android' ?ToastAndroid.show(json.error, ToastAndroid.SHORT) : alert(json.error)));
                }
            })
            .catch((error) => {
                Platform.OS === 'android'?ToastAndroid.show(error, ToastAndroid.SHORT):alert(error)
            })
    }
    render(){
        return(
                <Container>
                    <Content>
                    <View style={[{flex: 1, backgroundColor: '#ddd'}]}>
                        <Form style={[{margin: 5}]}>
                            <Textarea rowSpan={3}
                                      placeholder={`${MAX}以内，随意发挥~`}
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
                            <Col style={styles.col}>
                                <Picker
                                    mode="dropdown"
                                    placeholder={'类型'}
                                    selectedValue={this.state.typeSelected}
                                    onValueChange={this.onValueChange.bind(this)}
                                    style={[{width: 70}]}
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
                    <View style={[{flex: 3,backgroundColor:'#fff'}]}>
                        {Object.keys(this.state.posts).length !== 0 ? (
                            <View>
                                {
                                    this.state.posts.map((item, i) => <PostItem key={i} detail={item} onDelete={() => this.onDelete(item._id)}/>)
                                }
                                </View>
                        ) : (
                            <View style={[{flex: 1, alignItems: 'center'}]}>
                                <Text>一条推文都没有</Text>
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
