import React, {Component} from 'react';
import {Container, Content, Text, View} from "native-base";
import HistoryItem from '../HistoryItem';
import {DeviceEventEmitter} from 'react-native';


export default class Statistics extends Component{
    constructor(props){
        super(props);
    };
    render(){
        return(
            <Container>
                <Content>
                    <Text>这是统计</Text>
                </Content>
            </Container>
        )
    }
};