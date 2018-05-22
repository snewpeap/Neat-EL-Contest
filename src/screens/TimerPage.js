import React, { Component } from 'react';
import {Container, Content} from 'native-base';
import Timer from "../Timer";

class TimerPage extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <Timer/>
        );
    }
}

export default TimerPage;
