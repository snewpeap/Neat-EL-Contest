import React, { Component } from 'react';
//import Timer_25 from  "../Timer_25";

import {
    Container,
    Content,
    Footer,
    Header,
    Text,
} from 'native-base';

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
                </Content>
            </Container>
        );
    }
}

export default TimerPage;
