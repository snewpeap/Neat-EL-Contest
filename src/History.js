import React, {Component} from 'react';
import {Container, Content, Text, View} from "native-base";
import HistoryItem from './HistoryItem';
import {DeviceEventEmitter} from 'react-native';


export default class History extends Component{
    constructor(props){
        super(props);
        this.state = {
            historys:[],
        };
    }
    componentWillMount(){
        this.onFlush();
    }
    componentDidMount(){
        DeviceEventEmitter.addListener('flush',(newHistory) => {
            fetch(localURL, {
                method:'PUT',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"history":newHistory}),
            })
                .then((success) => {
                    alert(JSON.stringify({"history":newHistory}));
                })
                .catch((error) => {
                    alert(error);
                });
        });
    }
    componentWillUnmount(){
        DeviceEventEmitter.remove();
    };
    onDelete(i){
        let historyAfterDel = [];
        for (let j = 0;j < this.state.historys.length;j++){
            if (j !== i){
                historyAfterDel.push(this.state.historys[j]);
            }
        }
        historyAfterDel = {"history":historyAfterDel};
        fetch(localURL,{
            method:'PUT',
            headers:{
                Accept: 'application/json',
            },
            body:JSON.stringify(historyAfterDel),
        })
            .then((success) => {
                alert(JSON.stringify(historyAfterDel));
            })
            .catch((error) => {
                alert(error);
            });
    }
    onFlush(){
        fetch(localURL,{
            method:'GET',
        })
            .then((response) => response.json())
            .then((responseHistory) => {
                this.setState({
                    historys:responseHistory.history,
                })
            })
            .catch((error) => {
                alert(error);
            })
    }
    render(){
        return(
            <Container>
                <Content>
                {Object.keys(this.state.historys).length !== 0?(
                    <View>{
                        this.state.historys.map((item,i) => <HistoryItem key={i} detail={item} onDelete={() => this.onDelete(i)}/>)
                    }
                    </View>
                ):(
                    <Text>Have no history.</Text>
                )
                }
                </Content>
            </Container>
        );
    }
}
