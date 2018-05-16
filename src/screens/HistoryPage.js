import React, { Component } from 'react';
import {
    Container,
    Content,
    } from 'native-base';

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
                    <History/>
                </Content>
            </Container>
        );
    }
}

export default HistoryPage;
