import React,{Component} from 'react';
import {Button, Container, Content, Picker, Text, View} from "native-base";
import {DeviceEventEmitter} from 'react-native';
import moment from "moment";

class Tiktok extends Component{
    constructor(props){
        super(props);
        this.state = {
            timee: this.props.timee,
            min:Tiktok.formatter(this.props.timee / 60),
            sec:Tiktok.formatter(this.props.timee % 60),
            isPause:false,
        };
    }
    static formatter(timeLeft){
        if (timeLeft < 10){
            return '0'+parseInt(timeLeft);
        }else {
            return timeLeft;
        }
    }
    endCount(abandoned: boolean){
        DeviceEventEmitter.emit('timesUp',{abandoned:abandoned})
    }
    componentWillMount(){
        this.tiktok();
    }
    componentWillUnmount(){
        countDown && clearInterval(countDown);
    }
    tiktok(){
        global.countDown = setInterval(() => {
            if (this.state.timee > 0){
                let time = this.state.timee;
                this.setState({
                    timee:this.state.timee - 1,
                    min:Tiktok.formatter((time - 1) / 60),
                    sec:Tiktok.formatter((time - 1) % 60),
                });
            }else{
                this.endCount(false);
            }}, 10
        );
    }
    onButtonClick=() => {
        this.state.isPause?this.tiktok():clearInterval(countDown);
        this.setState({isPause:!this.state.isPause});
    };
    onAbandonButtonClick=() => {
        this.endCount(true);
    };
    render(){
        return(
            <View>
                <Text textAlign='center' style={[{fontSize: 30, color:'#ff4000'}]}>{this.state.min} : {this.state.sec}</Text>
                <Text>{this.state.timee}</Text>
                <Button block onPress={() => this.onButtonClick()}>
                    <Text>{this.state.isPause? '继续':'暂停'}</Text>
                </Button>
                <Button block onPress={() => this.onAbandonButtonClick()}>
                    <Text>放弃</Text>
                </Button>
            </View>
        );
    }
}

export default class YTimer extends Component{
    constructor(props){
        super(props);
        this.state = {
            targetTime: "0",
            isReady: true,
            selected: undefined,
        };
    }
    componentDidMount(){
        this.l2 = DeviceEventEmitter.addListener('timesUp',(value) => {this.timesUp(value.abandoned);});
    }
    componentWillUnmount(){
        this.l2.remove();
    }
    startTiming(){
        this.setState({
            isReady: false,
        });
    };
    timesUp(abandoned){
        let newHistory = {
            titl: "default title",
            lengt: this.state.targetTime + "min",
            datee: moment().format('MMM Do').toString(),
            isAbandoned: abandoned.toString(),
        };
        alert(newHistory.datee);
        DeviceEventEmitter.emit('flush', newHistory);
        this.setState({isReady: true});
    };
    onValueChange(value: string){
        this.setState({
            selected: value,
            targetTime: value,
        });
    }
    render(){
        return(
            <Container>
                {this.state.isReady ? (
                    <Content>
                        <Text>How long?</Text>
                        <Text>target time:{this.state.targetTime}</Text>
                        <Picker
                            mode="dropdown"
                            placeholder="Select one"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item disabled label='Select one' value='0'/>
                            <Picker.Item label="1" value='1' />
                            <Picker.Item label="5" value='5' />
                            <Picker.Item label="15" value='15' />
                            <Picker.Item label="30" value='30' />
                            <Picker.Item label="60" value='60' />
                        </Picker>
                        <Button block disabled={this.state.targetTime === '0'} onPress={() => this.startTiming()}>
                            <Text>Start!</Text>
                        </Button>
                    </Content>
                ) : (
                    <Content>
                        <Tiktok timee={parseInt(this.state.targetTime) * 60}/>
                    </Content>
                )}
                <Text>Fuck!</Text>
            </Container>
        );
    }
}
