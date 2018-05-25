import React,{Component} from 'react';
import {Platform, ToastAndroid, View} from "react-native";
import {Button, Icon, Text} from "native-base";

String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
export default class SuccessPage extends Component{
    constructor(props){
        super(props);
        this.state={
            postable:true,
        };
    }
    isBlank(str:String){
        return str == null || typeof str === "undefined" || str == "" || str.trim() == " ";
    }
    send(){
        let content = this.props.navigation.state.params.content.toString().replace(/[\n]/g, ' ');
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
        post.append('type', 'normal');
        post.append('tag', tag);
        fetch(`${localURL}/posts/create`,{
            method:'POST',
            headers:{},
            body:post,
            credentials:'include',
        })
            .then((response) => {
                if (response.ok){
                    this.setState({postable:false});
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
            <View style={{flexDirection:'column',flex:1,alignItems:'center'}}>
                <View style={{height:125}}/>
                    <Icon name={'checkmark-circle'} style={{color:'#3d2fff',fontSize:75}}/>
                    <Text style={{fontSize:30,color:'#3d2fff'}}>专注完成!</Text>
                <View style={{height:75}}/>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <Button onPress={() => {
                                this.send();
                            }}
                            disabled={!this.state.postable}
                            style={{marginRight:30}}
                    >
                        <Text>一键分享</Text>
                    </Button>
                    <Button transparent
                            onPress={() => {
                                this.props.navigation.goBack();
                                this.props.navigation.pop();
                            }}
                            style={{marginLeft:30}}
                    >
                        <Text>返回</Text>
                    </Button>
                </View>
            </View>
        );
    }
}
