import React, {Component} from 'react';
import {Card, Container, Content, Text, View} from "native-base";
import moment from 'moment'
import HistoryItem from './HistoryItem';

let historys = [
    {titl: 'asd', lengt: '123min', datee: '2018.5.3'},
    {titl: '哈哈', lengt: '4min', datee: '2018.5.33'},
];

export default class History extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    onDelete(i){
        historys.splice(i, 1);
        this.forceUpdate();
    }
    render(){
        return(
            <Container>
                <Content>
                {Object.keys(historys).length !== 0?(
                    <View>{
                        historys.map((item,i) => <HistoryItem key={i} detail={item} onDelete={() => this.onDelete(i)}/>)
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
