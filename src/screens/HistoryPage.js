import React, { Component } from 'react';
import {
    Container,
    Content,
    Text,
} from 'native-base';
import HaveDone from '../HaveDone';
import History from '../History';

class HistoryPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <Container>
                <Content>
                    <Text>This is History Page.</Text>
                    <History/>
                </Content>
            </Container>
        );
    }
}

export default HistoryPage;
