import React, { Component } from 'react';
import {Text, StyleSheet, TouchableHighlight,View} from 'react-native';
import TimerPage from './screens/TimerPage';
const Sound = require('react-native-sound');


class Timer extends Component{

    constructor(props) {
        super(props);
        let timeLeft = this.props.timeLeft > 0 ? this.props.timeLeft : 24;
        let secondLeft = this.props.secondLeft > 0 ? this.props.secondLeft : 59;
        let isBack = false;
        let isPause = false;
        let isResume = true;
        let isSoundPause = true;
        let isSoundPlay = false;
        let isBeforeClose = false;
        Sound.setCategory('Playback');
        this.state = {
            timeLeft: timeLeft,
            secondLeft: secondLeft,
            isBack: isBack,
            isPause: isPause,
            isResume: isResume,
            loopingSound : undefined,
            isSoundPause : isSoundPause,
            isSoundPlay : isSoundPlay,
            isBeforeClose : isBeforeClose,
        };
       /* this.playSoundBundle = ()=>{
            const whiteSound = new Sound('rain.mp3',Sound.MAIN_BUNDLE,(error)=>{
                if(error){
                    alert('Sound error');
                }else{
                    whiteSound.setSpeed(1);
                    whiteSound.play(()=>whiteSound.release());
                }
            })
        }; */

        this.playSoundLoop = () =>{
            if(this.state.loopingSound){
                return;
            }
            const genRandom =Math.random() * 5 | 0;
            if (genRandom === 0 ){const whiteSound = new Sound('blue_and_white_flycatcher.mp3',Sound.MAIN_BUNDLE,(error)=>{
                if(error){
                    alert('Sound error');
                }
                whiteSound.setNumberOfLoops(-1);
                whiteSound.play();
            });
                this.setState({
                    loopingSound : whiteSound,
                    isSoundPlay : true,
                    isSoundPause : false,
                    isBeforeClose : false,
                })}
            else if(genRandom === 1){const whiteSound = new Sound('gentle_ocean_waves.mp3',Sound.MAIN_BUNDLE,(error)=>{
                if(error){
                    alert('Sound error');
                }
                whiteSound.setNumberOfLoops(-1);
                whiteSound.play();
            });
                this.setState({
                    loopingSound : whiteSound,
                    isSoundPlay : true,
                    isSoundPause : false,
                    isBeforeClose : false,
                })}
            else if(genRandom === 2){ const whiteSound = new Sound('rain.mp3',Sound.MAIN_BUNDLE,(error)=>{
                if(error){
                    alert('Sound error');
                }
                whiteSound.setNumberOfLoops(-1);
                whiteSound.play();
            });
                this.setState({
                    loopingSound : whiteSound,
                    isSoundPlay : true,
                    isSoundPause : false,
                    isBeforeClose : false,
                })}
           else if(genRandom === 3){
                const whiteSound = new Sound('small_stream.mp3',Sound.MAIN_BUNDLE,(error)=>{
                    if(error){
                        alert('Sound error');
                    }
                    whiteSound.setNumberOfLoops(-1);
                    whiteSound.play();
                });
                this.setState({
                    loopingSound : whiteSound,
                    isSoundPlay : true,
                    isSoundPause : false,
                    isBeforeClose : false,
                })}
            else{ const whiteSound = new Sound('water.mp3',Sound.MAIN_BUNDLE,(error)=>{
                if(error){
                    alert('Sound error');
                }
                whiteSound.setNumberOfLoops(-1);
                whiteSound.play();
            });
                this.setState({
                    loopingSound : whiteSound,
                    isSoundPlay : true,
                    isSoundPause : false,
                    isBeforeClose : false,
                })}
    };

      this.stopSoundLooped=()=>{
      if(!this.state.loopingSound){
          return;
      }
      this.state.loopingSound
          .stop()
          .release();
      this.setState({
          loopingSound : null,
          isSoundPlay : false,
          isSoundPause : true,
          isBeforeClose : true,
      })
      };
    }


    _onPausePress = ()=>{
        let that = this;
        clearInterval(interval_lbg);
        that.setState({
            isPause:true,
            isResume : false,
            isSoundPlay : true,
        });
        if (that.state.isBeforeClose === false){
            if(!this.state.loopingSound){
                return;
            }
            this.state.loopingSound
                .stop()
                .release();
            this.setState({
                loopingSound : null,
                isSoundPause : true,
            })
        }
    };
    _onResumePress = () =>{
        let that = this;
        this.countTime(that.state.timeLeft,that.state._afterEnd);
        if(that.state.isBeforeClose === false){
            if(this.state.loopingSound){
                return;
            }
            const genRandom =Math.random() * 5 | 0;
            if (genRandom === 0 ){const whiteSound = new Sound('blue_and_white_flycatcher.mp3',Sound.MAIN_BUNDLE,(error)=>{
                if(error){
                    alert('Sound error');
                }
                whiteSound.setNumberOfLoops(-1);
                whiteSound.play();
            });
                this.setState({
                    loopingSound : whiteSound,
                    isSoundPlay : true,
                    isSoundPause : false,
                })}
            else if(genRandom === 1){const whiteSound = new Sound('gentle_ocean_waves.mp3',Sound.MAIN_BUNDLE,(error)=>{
                if(error){
                    alert('Sound error');
                }
                whiteSound.setNumberOfLoops(-1);
                whiteSound.play();
            });
                this.setState({
                    loopingSound : whiteSound,
                    isSoundPlay : true,
                    isSoundPause : false,
                })}
            else if(genRandom === 2){ const whiteSound = new Sound('rain.mp3',Sound.MAIN_BUNDLE,(error)=>{
                if(error){
                    alert('Sound error');
                }
                whiteSound.setNumberOfLoops(-1);
                whiteSound.play();
            });
                this.setState({
                    loopingSound : whiteSound,
                    isSoundPlay : true,
                    isSoundPause : false,
                })}
            else if(genRandom === 3){
                const whiteSound = new Sound('small_stream.mp3',Sound.MAIN_BUNDLE,(error)=>{
                    if(error){
                        alert('Sound error');
                    }
                    whiteSound.setNumberOfLoops(-1);
                    whiteSound.play();
                });
                this.setState({
                    loopingSound : whiteSound,
                    isSoundPlay : true,
                    isSoundPause : false,
                })}
            else{ const whiteSound = new Sound('water.mp3',Sound.MAIN_BUNDLE,(error)=>{
                if(error){
                    alert('Sound error');
                }
                whiteSound.setNumberOfLoops(-1);
                whiteSound.play();
            });
                this.setState({
                    loopingSound : whiteSound,
                    isSoundPlay : true,
                    isSoundPause : false,
                })}
        }
        else{
            that.setState({isSoundPlay : false})
        }
        that.setState({
            isPause : false,
            isResume : true,
        })
    };
    countTime(timeLeft,afterEnd) {
        let that = this;
        if (timeLeft >= 0) {

             global.interval_lbg = setInterval(() => {
                if (that.state.secondLeft < 1) {
                    if (timeLeft <= 0) {
                        clearInterval(interval_lbg)
                    }
                    that.setState({
                        secondLeft: 59,
                        timeLeft: that.state.timeLeft - 1,
                    })}
                 else {
                    let totalTime = that.state.secondLeft;
                    that.setState({
                        secondLeft: totalTime - 1,
                    })
                }
            }, 1000)
        }
    }

    static _afterEnd(){
        console.log('Time Over!!!');
    }

    componentDidMount () {
        let time = this.state.timeLeft;
        let afterEnd = Timer._afterEnd;
        this.countTime(time,afterEnd);
    };



    render(){


        let display_1 = this.state.timeLeft;
        let display_2 = this.state.secondLeft;
        if(this.state.isBack){return(<TimerPage/>)}
        else{
        if((display_1 === 0 && display_2 === 0) || display_1 < 0){
            return(
                <View>
                <Text style={styles.bigblue}>Time Over</Text>
                    <TouchableHighlight onPress={()=>this.setState({isBack:true})}>
                        <Text style={styles.buttonBlack}>返回</Text>
                    </TouchableHighlight>
                    <TouchableHighlight disabled={this.state.isSoundPlay} onPress={this.playSoundLoop}>
                        <Text style={styles.buttonBlack}>播放音乐</Text>
                    </TouchableHighlight>
                    <TouchableHighlight disabled={this.state.isSoundPause} onPress={this.stopSoundLooped}>
                        <Text style={styles.buttonBlack}>停止播放</Text>
                    </TouchableHighlight>
                </View>
            )
        }
        else if(display_1 < 10 && display_2 < 10){
            return(
                <View>
                    <View>
                <Text style={styles.bigblue}>0{display_1} : 0{display_2}</Text>
                </View>
            <View style={{flexDirection : 'row'}}>
                <TouchableHighlight disabled={this.state.isPause} onPress={this._onPausePress}>
                    <Text style={styles.buttonBlack}>暂停</Text>
                </TouchableHighlight>
                <TouchableHighlight disabled={this.state.isResume} onPress={this._onResumePress}>
                    <Text style={styles.buttonBlack}>继续</Text>
                </TouchableHighlight>
                <TouchableHighlight disabled={this.state.isSoundPlay} onPress={this.playSoundLoop}>
                    <Text style={styles.buttonBlack}>播放音乐</Text>
                </TouchableHighlight>
                <TouchableHighlight disabled={this.state.isSoundPause} onPress={this.stopSoundLooped}>
                    <Text style={styles.buttonBlack}>停止播放</Text>
                </TouchableHighlight>
            </View>
            </View>
            )
        }
        else if(display_1 < 10){
            return(
                <View>
                    <View>
                <Text style={styles.bigblue}>0{display_1} : {display_2}</Text>
                    </View>
                    <View style={{flexDirection : 'row'}}>
                        <TouchableHighlight disabled={this.state.isPause} onPress={this._onPausePress}>
                            <Text style={styles.buttonBlack}>暂停</Text>
                        </TouchableHighlight>
                        <TouchableHighlight disabled={this.state.isResume} onPress={this._onResumePress}>
                            <Text style={styles.buttonBlack}>继续</Text>
                        </TouchableHighlight>
                        <TouchableHighlight disabled={this.state.isSoundPlay} onPress={this.playSoundLoop}>
                            <Text style={styles.buttonBlack}>播放音乐</Text>
                        </TouchableHighlight>
                        <TouchableHighlight disabled={this.state.isSoundPause} onPress={this.stopSoundLooped}>
                            <Text style={styles.buttonBlack}>停止播放</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            )
        }
        else if(display_2 < 10){
            return(
                <View>
                    <View>
                <Text style={styles.bigblue}>{display_1} : 0{display_2}</Text>
                    </View>
                    <View style={{flexDirection : 'row'}}>
                        <TouchableHighlight disabled={this.state.isPause} onPress={this._onPausePress}>
                            <Text style={styles.buttonBlack}>暂停</Text>
                        </TouchableHighlight>
                        <TouchableHighlight disabled={this.state.isResume} onPress={this._onResumePress}>
                            <Text style={styles.buttonBlack}>继续</Text>
                        </TouchableHighlight>
                        <TouchableHighlight disabled={this.state.isSoundPlay} onPress={this.playSoundLoop}>
                            <Text style={styles.buttonBlack}>播放音乐</Text>
                        </TouchableHighlight>
                        <TouchableHighlight disabled={this.state.isSoundPause} onPress={this.stopSoundLooped}>
                            <Text style={styles.buttonBlack}>停止播放</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            )
        }
        else{
            return(
                <View>
                <View >
                <Text style={styles.bigblue}>{display_1} : {display_2}</Text>
                </View>
                <View style={{flexDirection : 'row'}}>
                <TouchableHighlight disabled={this.state.isPause} onPress={this._onPausePress}>
        <Text style={styles.buttonBlack}>暂停</Text>
        </TouchableHighlight>
            <TouchableHighlight disabled={this.state.isResume} onPress={this._onResumePress}>
                <Text style={styles.buttonBlack}>继续</Text>
                </TouchableHighlight>
                    <TouchableHighlight disabled={this.state.isSoundPlay} onPress={this.playSoundLoop}>
                        <Text style={styles.buttonBlack}>播放音乐</Text>
                    </TouchableHighlight>
                    <TouchableHighlight disabled={this.state.isSoundPause} onPress={this.stopSoundLooped}>
                        <Text style={styles.buttonBlack}>停止播放</Text>
                    </TouchableHighlight>
            </View>
                </View>
            )
        }

        }}

}


const styles = StyleSheet.create({
    bigblue : {
        color : 'blue',
        fontWeight : 'bold',
        fontSize : 30,
    },
    buttonBlack : {
        color : 'black',
        fontWeight: 'bold',
    },
     button: {
        fontSize: 20,
        backgroundColor: 'silver',
        padding: 5,
        },
    feature: {
        padding: 20,
        alignSelf: 'stretch',
    }
});
module.exports = Timer;

