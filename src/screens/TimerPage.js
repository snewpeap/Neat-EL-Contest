import React, { Component } from 'react';
import YTimer from "../YTimer";
import {Container, Content, Text} from 'native-base';

class TimerPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <Container>
                <Content>
                    <Text>This is Timer Page.</Text>
                    <YTimer/>
                </Content>
            </Container>
        );
    }
}

export default TimerPage;
