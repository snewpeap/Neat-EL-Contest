import React, {Component} from 'react';
import {Body, Card, CardItem, Container, Content, Text} from "native-base";
import moment from 'moment'

let historys = [
    {titl: 'asd', lengt: '123min', datee: moment()},
];

export default class History extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    empty(){
        for(let history in this.historys){
            return true;
        }return false;
    }
    render(){
        return(
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                            <Text>{historys[0].datee}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}
