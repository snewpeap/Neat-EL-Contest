import React,{Component} from 'react';
import {Button, Container, Content, Picker, Text, View} from "native-base";
import {Alert, DeviceEventEmitter, ImageBackground, StyleSheet,} from 'react-native';
import moment from "moment";
import SoundPlay from './SoundPlay';
import RadioModal from 'react-native-radio-master';



class Tiktok extends SoundPlay{
    constructor(props){
        super(props);
        let choose =  Math.random() * 5 | 0;
        let isPlaySound = this.props.isPlaySound;
        this.state = {
            timee: this.props.timee,
            min:Tiktok.formatter(this.props.timee / 60),
            sec:Tiktok.formatter(this.props.timee % 60),
            isPause:false,
            choose : choose,
            isPlaySound:isPlaySound
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
        this.stopSoundLooped();
    }
    tiktok(){
        this.state.isPlaySound ? this.playSoundLoop() :  {};
        global.countDown = setInterval(() => {
            if (this.state.timee > 0){
                let time = this.state.timee;
                this.setState({
                    timee:this.state.timee - 1,
                    min:Tiktok.formatter(Math.trunc((time - 1) / 60)),
                    sec:Tiktok.formatter((time - 1) % 60),
                });
            }else{
                this.endCount(false);
            }}, 1000
        );
    };
    stopCountDown(){
        clearInterval(countDown);
        this.stopSoundLooped();
    }
    onButtonClick=() => {
        this.state.isPause?this.tiktok():this.stopCountDown();
        this.setState({isPause:!this.state.isPause});
    };
    onAbandonButtonClick=() => {
        this.stopSoundLooped();
        this.endCount(true);
    };
    render(){
        return(
            <View>
                <Text  style={{textAlign : 'center',fontSize: 47, color:'#5561ff',fontWeight:'bold'}}>{this.state.min} : {this.state.sec}</Text>
                <View style={{alignItems:'center'}}>
                    <View style={{flex : 1}}>
                <Button  rounded  onPress={() => this.onButtonClick()}>
                    <Text style={styles.buttonText}>{this.state.isPause? '继续':'暂停'}</Text>
                </Button>
                    </View>
                    <View style={{flex : 1}}>
                <Button  rounded  onPress={() => this.onAbandonButtonClick()}>
                    <Text style={styles.buttonText}>放弃</Text>
                </Button>
                    </View>
                </View>
            </View>
        );
    }
}



export default class Timer extends SoundPlay {
    constructor(props){
        super(props);
        this.state = {
            targetTime: "0",
            isReady: true,
            selected: undefined,
            isPlaySound : true,
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
    selected(item){
        if(item.initItem === '不播放白噪音'){
            this.setState({isPlaySound : false});
        }else{
            this.setState({isPlaySound : true});
        }
    }
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
                        <Text>多长时间?</Text>
                        <Text>预计时间:{this.state.targetTime}分钟</Text>
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
                        <Button style={{flex:2}} rounded block disabled={this.state.targetTime === '0'} onPress={() => this.startTiming()}>
                            <Text style={{color : '#e8ffe6'}}>开始</Text>
                        </Button>
                        <RadioModal
                            selectedValue={this.state.initId}
                            onValueChange={(id,item)=>this.selected({initItem : item})}
                        >
                            <Text value='0'>播放白噪音</Text>
                            <Text value='1'>不播放白噪音</Text>
                        </RadioModal>
                    </Content>
                ) : (

                    <Content>
                        <Tiktok isPlaySound = {this.state.isPlaySound} timee={parseInt(this.state.targetTime) * 60}/>
                    </Content>

                )}
                <Text>Fuck!</Text>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        paddingBottom:50,
    },
    buttonText : {
        color:'#463cff',
        fontWeight: 'bold',
        fontSize:17,
    },
});