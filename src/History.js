import React, {Component} from 'react';
import {Button, Container, Content, Text, View} from "native-base";
import HistoryItem from './HistoryItem';
import {DeviceEventEmitter} from 'react-native';


export default class History extends Component{
    constructor(props){
        super(props);
        this.state = {
            historys:[],
        };
    }
    d1 = null;d2 = null;
    componentDidMount(){
        this.d1 = DeviceEventEmitter.addListener('flush',(newHistory) => {
            if (isLogin) {
                fetch(`${localURL}/historys/create/`, {
                    method: 'POST',
                    headers: {},
                    body: newHistory,
                    credentials: 'include',
                })
                    .then((response) => {
                        if (response.ok) {
                            response.json().then((json) => {
                                alert(json.message);
                            });
                            this.onFlush();
                        } else if (response.status === 500) {
                            response.json().then((json) => alert(json.error));
                        }
                    })
                    .catch((error) => {
                        alert(error);
                    });
            }
        });
        this.d2 = DeviceEventEmitter.addListener("login",() => this.onFlush());
        this.d3 = DeviceEventEmitter.addListener("logout",() => this.forceUpdate());
        this.onFlush();
    }
    componentWillUnmount(){
        this.d1.remove();
        this.d2.remove();
        this.d3.remove();
    };
    onDelete(id){
        fetch(`${localURL}/historys/${id}/remove/`,{
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
    onFlush(){
        fetch(`${localURL}/historys/get/`,{
            method:'GET',
            credentials:'include',
        })
            .then((response) => {
                if (response.ok){
                    response.json().then((responseHistory) => {
                        this.setState({
                            historys:responseHistory.history,
                        })
                    });
                } else {
                    response.json().then((json) => alert(json.error));
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
                    {isLogin? (Object.keys(this.state.historys).length !== 0?(
                        <View>
                            {
                                this.state.historys.map((item,i) => <HistoryItem key={i} detail={item} onDelete={() => this.onDelete(item._id)}/>)
                            }
                            </View>
                        ):(
                            <View style={[{flex:1, alignItems:'center'}]}>
                                <Text>你还没有专注历史</Text>
                            </View>
                            )
                        ):(
                            <Container>
                                <Content>
                                    {isLogin?
                                        <History/>:
                                        <View>
                                            <Text>你还没有登陆</Text>
                                            <Text>不登陆你能变强吗？</Text>
                                            <Button onPress={() => this.props.navigation.navigate('SocialPage')}>
                                                <Text>去登陆</Text>
                                            </Button>
                                        </View>
                                    }
                                    </Content>
                            </Container>
                    )
                }
                </Content>
            </Container>
        );
    }
}
