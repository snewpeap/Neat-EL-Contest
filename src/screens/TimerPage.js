import React, { Component } from 'react';
import {Container, Content, Footer} from 'native-base';
import Timer from "../Timer";


class TimerPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <Container style={{flexDirection : 'column'}}>
                <Content scrollEnabled={false}>
                        <Timer navigation={this.props.navigation}/>
                </Content>
            </Container>
        );
    }
}

export default TimerPage;
