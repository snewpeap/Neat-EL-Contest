import React, { Component } from 'react';

import Timer from "../Timer";
import {TouchableHighlight,View} from 'react-native';



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
        let isBegin_25True = false;
        let isBegin_50True = false;
        this.state = {
            isBegin_25True:isBegin_25True,
            isBegin_50True:isBegin_50True,
        };
    }
    _Begin_25=()=>{
        let that = this;
       that.setState({isBegin_25True : true,})
    };
    _Begin_50=()=>{
        let that = this;
        that.setState({isBegin_50True : true,})
    };
    render(){
        if(this.state.isBegin_25True && !this.state.isBegin_50True){
        return (
            <Container>
                <Content>
                    <Timer timeLeft={24}/>
                    <Text>This is Timer Page.</Text>
                </Content>
            </Container>
        );}
        else if(this.state.isBegin_50True && !this.state.isBegin_25True){
           return(
               <Container>
                   <Content>
                       <Timer timeLeft={49}/>
                   </Content>
               </Container>
           )}
           else{
            return(
                <Container>
                    <Content>
                        <Text>This is Timer Page.</Text>
                        <View style={{flexDirection : 'row'}}>
                            <TouchableHighlight onPress={this._Begin_25}>

                                <Text>短时专注</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this._Begin_50}>

                                <Text>长时专注</Text>
                            </TouchableHighlight>
                        </View>
                    </Content>
                </Container>
            )
        }
    }
}

export default TimerPage;
