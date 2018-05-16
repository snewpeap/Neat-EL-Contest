import React, { Component } from 'react';
import YTimer from "../YTimer";
import {Container, Content} from 'native-base';
import Timer from "../Timer";

class TimerPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <Container>
                <Content>
                    <Timer/>
                </Content>
            </Container>
        );
    }
}

export default TimerPage;
