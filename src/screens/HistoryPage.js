import React, { Component } from 'react';
import {
    Container,
    Content,
    Text,
} from 'native-base';

//import History from '../History';

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
                </Content>
            </Container>
        );
    }
}

export default HistoryPage;
