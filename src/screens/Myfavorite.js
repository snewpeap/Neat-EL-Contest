import React,{Component} from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, View} from "native-base";
import {Platform, ToastAndroid} from "react-native";
import PostItem from "../postItem";

export default class MyFavorite extends Component{
    constructor(props){
        super(props);
        this.state={
            posts:[],
        };
    }
    componentDidMount(){
        this.onFlush();
    }
    onFlush(){
        fetch(`${localURL}/posts?type=jingyan&author=&requestFavorite=true`,{
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
                    response.json().then((json) => {Platform.OS === 'android'?ToastAndroid.show(json.error, ToastAndroid.SHORT):alert(json.error)});
                }
            })
            .catch((error) => {
                alert(error);
            })
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
                        Platform.OS === "android" ?ToastAndroid.show(json.error, ToastAndroid.SHORT) : alert(json.error)});
                }
            }).catch((error) => {
            Platform.OS === 'android'?ToastAndroid.show(error, ToastAndroid.SHORT):alert(error)
        });
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
                        alert(json.message);
                    })
                } else if (response.status === 500) {
                    response.json().then((json) => alert(json.error));
                }
            })
            .catch((error) => {
                alert(error);
            });
    }
    render(){
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                                onPress={() => {
                                    this.props.navigation.state.params.callback();
                                    this.props.navigation.goBack();
                                }}
                        >
                            <Icon name='ios-arrow-back'/>
                        </Button>
                    </Left>
                    <Body style={{alignItem:'center'}}>
                    <Text style={{color:'white'}}>我的收藏</Text>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    {Object.keys(this.state.posts).length !== 0 ? (
                        <View>
                            {
                                this.state.posts.map((item, i) =>
                                    <PostItem first last
                                              key={i} detail={item} favor={true}
                                              onDelete={() => this.onDelete(item._id)}
                                              onFavorite={(isFavorite,callback) => this.onFavorite(i,item._id,isFavorite,callback)}
                                    />)
                            }
                        </View>
                    ) : (
                        <View>
                            <View style={[{flex: 1,backgroundColor:'transparent'}]}>
                            </View>
                            <View style={[{flex: 1, alignItems: 'center',backgroundColor:'transparent'}]}>
                                <Text>你还没有收藏的经验</Text>
                            </View>
                        </View>
                    )
                    }
                </Content>
            </Container>
        );
    }
}
