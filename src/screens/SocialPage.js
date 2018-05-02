import React, { Component } from 'react';
import {
    Container,
    Content,
    Text,
} from 'native-base';

class SocialPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <Container>
                <Content>
                    <Text>This is Social Page.</Text>
                </Content>
            </Container>
        );
    }
}

export default SocialPage;
