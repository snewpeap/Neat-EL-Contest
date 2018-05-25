import React,{Component} from 'react';
import {Button, Col, Container, Content, Form, Grid, Icon, Input, Item, Label, Picker, Text,} from "native-base";
import {
    DeviceEventEmitter,
    Modal,
    StyleSheet,
    Platform,
    AppState,
    Vibration,
    ScrollView,
    Animated,
    Dimensions,
    ToastAndroid,
    View
} from 'react-native';
import SoundPlay from './SoundPlay';
import RadioModal from 'react-native-radio-master';
import BackgroundTimer from 'react-native-background-timer';

String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
global.screenWidth = Dimensions.get('window').width;
class Tiktok extends SoundPlay{
    constructor(props){
        super(props);
        let isPlaySound = this.props.isPlaySound;
        this.state = {
            timee: this.props.timee,
            min:Tiktok.formatter(this.props.timee / 60),
            sec:Tiktok.formatter(this.props.timee % 60),
            isPause:false,
            choose : this.props.choose,
            isPlaySound:isPlaySound,
            scrollItems:[],
        };

        this._index = 0;
        this._max = Object.keys(this.state.scrollItems).length + 1;
    }
    d1 = null;
    static formatter(timeLeft){
        if (timeLeft < 10){
            return '0'+parseInt(timeLeft);
        }else {
            return parseInt(timeLeft);
        }
    }
    endCount(){
        DeviceEventEmitter.emit('timesUp')
    }
    componentDidMount(){
        this.d1 = DeviceEventEmitter.addListener('abandonCanceled',() => {this.tiktok();this.setState({isPause:false});});
        fetch(`${localURL}/posts/byTag?tag=${this.props.tag == DEFAULT_TITLE?'专注':this.props.tag}&type=jingyan&count=${this.props.timee / 15}`,{
            method:'GET',
            credentials:'include',
        }).then((response) => {
            if (response.ok){
                response.json().then((response) => {
                    this.setState({scrollItems:response.posts});
                    return response;
                }).then((response) => {
                    this.tiktok();
                });
            } else {
                response.json().then((json) => {Platform.OS === 'android'?ToastAndroid.show(json.error, ToastAndroid.SHORT):alert(json.error)});
            }
        })
            .catch((error) => {
                Platform.OS === 'android'? ToastAndroid.show(error.message, ToastAndroid.SHORT) : alert(error.message);
            });
    }
    componentWillUnmount(){
        countDown &&(Platform.OS === 'android'? BackgroundTimer.clearInterval(countDown) : clearInterval(countDown));
        this.d1.remove();
        this.stopSoundLooped();
    }
    tiktok(){
        this._max = this.state.scrollItems.length + 1;
        this.state.isPlaySound ? this.playSoundLoop() :  {};
        let flag = 0;
        if(Platform.OS === 'android'){
        global.countDown = BackgroundTimer.setInterval(() => {
            if (this.state.timee > 0){
                let time = this.state.timee;
                if (flag < 9){
                    flag ++;
                } else {
                    this._index++;
                    if(this._index >= this._max){
                        this._index = 0;
                    }
                    this._scrollView.scrollTo({x: this._index * screenWidth}, true);
                    flag = 0;
                }
                this.setState({
                    timee:this.state.timee - 1,
                    min:Tiktok.formatter(Math.trunc((time - 1) / 60)),
                    sec:Tiktok.formatter((time - 1) % 60),
                });
            }else{
                this.endCount();
            }}, 1000
        );
        }else{
            if(AppState.currentState === 'active'){
                BackgroundTimer.stopBackgroundTimer();
            global.countDown = setInterval(() => {
                if (this.state.timee > 0){
                    let time = this.state.timee;
                    if (flag < 9){
                        flag ++;
                    } else {
                        this._index++;
                        if(this._index >= this._max){
                            this._index = 0;
                        }
                        this._scrollView.scrollTo({x: this._index * screenWidth}, true);
                        flag = 0;
                    }
                    this.setState({
                        timee:this.state.timee - 1,
                        min:Tiktok.formatter(Math.trunc((time - 1) / 60)),
                        sec:Tiktok.formatter((time - 1) % 60),
                    });
                }else{
                    this.endCount();
                }}, 1000
            );
        }else{
                 BackgroundTimer.runBackgroundTimer(() => {
                    if (this.state.timee > 0){
                        let time = this.state.timee;
                        if (flag < 3){
                            flag ++;
                        } else {
                            this._index++;
                            if(this._index >= this._max){
                                this._index = 0;
                            }
                            this._scrollView.scrollTo({x: this._index * screenWidth}, true);
                            flag = 0;
                        }
                        this.setState({
                            timee:this.state.timee - 3,
                            min:Tiktok.formatter(Math.trunc((time - 3) / 60)),
                            sec:Tiktok.formatter((time - 3) % 60),
                        });
                    }else{
                        this.endCount();
                    }}, 3000
                );
    }}}
    stopCountDown(){
       Platform.OS === 'android' ? BackgroundTimer.clearInterval(countDown) : clearInterval(countDown);
        this.stopSoundLooped();
    }
    onButtonClick=() => {
        this.state.isPause?this.tiktok():this.stopCountDown();
        this.setState({isPause:!this.state.isPause});
    };
    onAbandonButtonClick=() => {
        Platform.OS === 'android' ? BackgroundTimer.clearInterval(countDown) : clearInterval(countDown);
        this.setState({isPause:true});
        this.props.onAbandon();
    };
    render(){
        return(
                <View style={{flexDirection:'column',justifyContent:'center'}}>
                    <View style={{height:30}}/>
                    <ScrollView horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                ref={(scrollView) => { this._scrollView = scrollView;}}
                                style={{flex:2}}
                    >
                        <Animated.View style={{flexDirection:'row',flex:1}}>
                            <View style={{flex:1,flexDirection:'row',alignItems:'baseline'}}>
                                <View style={[{width:screenWidth,justifyContent: 'center',alignItems:'center', alignContent:'center', alignSelf:'center'}]}>
                                    <Text  style={[{fontSize:77, color:'#3d2fff',fontWeight:'bold'}]}>{this.state.min}:{this.state.sec}</Text>
                                </View>
                                {this.state.scrollItems.map((item,i) =>
                                <View key={i} style={{flex:1,marginTop:40,marginBottom:40,width:screenWidth,alignItems:'center'}}>
                                    <View style={{
                                        flex:1,
                                        width:screenWidth*0.6,
                                        alignItems:'center',
                                        backgroundColor:'rgba(0,0,0,0.5)',
                                        paddingVertical:30,
                                        paddingHorizontal:20,
                                        borderRadius:10
                                    }}>
                                        <Text style={{color:'white'}}>{item.content}</Text>
                                    </View>
                                </View>
                                )
                                }
                            </View>
                        </Animated.View>
                    </ScrollView>
                    <View style={{height:30}}/>
                    <View style={[{flex:1,alignSelf:'center',flexDirection:'row'}]}>
                        <Button large style={{borderRadius:10}} onPress={() => this.onButtonClick()}>
                            <Text>{this.state.isPause? '继续':'暂停'}</Text>
                        </Button>
                        <View style={{width:30}}/>
                        <Button large danger style={{borderRadius:10}} onPress={() => this.onAbandonButtonClick()}>
                            <Text>放弃</Text>
                        </Button>
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
            title:null,
            tag:null,
            isReady: true,
            selected: null,
            modalTransparent: true,
            modalVisible:false,
            isPlaySound:false,
            x1:0,
            x2:0,
            timeList:['1','5','15','30','60'],
            playList:['不播放白噪音','林间之声','海洋波澜','淅淅夏雨','山谷蛙鸣','潺潺泉涌'],
        };
        this._indextime = 0;this._indexplay = 0;
    }
    l2 = null;
    componentDidMount(){
        this.l2 = DeviceEventEmitter.addListener('timesUp',() => {this.timesUp();});
    }
    componentWillUnmount(){
        this.l2.remove();
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    startTiming(){
        this.setState({
            isReady: false,
        });
    };

    isBlank(str:String){
        return str == null || typeof str === "undefined" || str == "" || str.trim() == " ";
    }
    timesUp(){
        let newHistory = new FormData();
        newHistory.append("title",this.state.title === null?DEFAULT_TITLE:this.state.title);
        newHistory.append("length",this.state.targetTime);
        const targetTime = this.state.targetTime;
        DeviceEventEmitter.emit('flush', newHistory);
        this.setState({isReady: true, modalVisible:false, selected:"0",isPlaySound:false,targetTime : '0'});
        Vibration.vibrate();
        this.props.navigation.navigate('Success',{
            content:`#${this.isBlank(this.state.title) || this.state.title == DEFAULT_TITLE?'专注':this.state.title}#就在刚才，我进行了一次${targetTime}分钟的专注。专注使我快乐！`})
    };
    uncommonTimesUp(){
        this.setState({isReady: true, modalVisible:false,isPlaySound : false, selected:"0",targetTime : '0'});
        this.state.isPlaySound ? this.stopSoundLooped() :  {};
    }
    render(){
        let modalBackgroundStyle = {
            backgroundColor: this.state.modalTransparent ? 'rgba(0, 0, 0, 0.5)' : '#ffffff',
        };
        let innerContainerTransparentStyle = this.state.modalTransparent ?
            {backgroundColor: '#fff', padding: 20}
            : null;
        return(
            <View style={{flexDirection:'column',justifyContent:'center',flex:1}}>
                {this.state.isReady ? (
                    <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                        <View style={{height:50}}/>
                        <Form>
                        <Label style={{color:'#002'}}>专注项目：</Label>
                        <Item rounded style={[{backgroundColor:'transparent',width:screenWidth*0.8}]}>
                            <Input multiline={false}
                                   placeholder={DEFAULT_TITLE}
                                   onChangeText={(text) => { this.setState({title:text})}}
                            />
                        </Item>
                        <Label style={{color:'#002'}}>打个标签：</Label>
                        <Item rounded style={[{backgroundColor:'transparent',width:screenWidth*0.8}]}>
                            <Input multiline={false}
                                   placeholder={'一个就够'}
                                   onChangeText={(text) => { this.setState({tag:text})}}
                            />
                        </Item>
                        <Label style={{color:'#002'}}>专注时长：</Label>
                        <View style={{flexDirection:'row',width:screenWidth*0.8}}>
                            <Icon name={'remove'} onPress={() => {
                                if (this._indextime !== 0){
                                    this._timescrollView.scrollTo({x:this.state.x1 - screenWidth*0.8});
                                    this._indextime--;
                                    this.setState({x1:this.state.x1 - screenWidth*0.8})
                                }
                            }}
                            />
                        <ScrollView horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    pagingEnabled={true}
                                    ref={(scrollView) => { this._timescrollView = scrollView;}}
                        >{
                            this.state.timeList.map((item,i) =>
                                    <View key={i} style={{flex:1,width:screenWidth*0.8,alignItems:'center'}}>
                                        <Text>{item}</Text>
                                </View>)
                            }
                        </ScrollView>
                            <Icon name={'add'} onPress={() => {
                                if (this._indextime !== this.state.timeList.length - 1){
                                    this._timescrollView.scrollTo({x:this.state.x1 + screenWidth*0.8});
                                    this._indextime++;
                                    this.setState({x1:this.state.x1 + screenWidth*0.8})
                                }
                            }}
                            />
                        </View>
                        <Label style={{color:'#002'}}>背景音乐：</Label>
                        <View style={{flexDirection:'row',width:screenWidth*0.8}}>
                            <Icon name={'remove'} onPress={() => {
                                if (this._indexplay !== 0){
                                    this._playscrollView.scrollTo({x:this.state.x2 - screenWidth*0.8});
                                    this._indexplay--;
                                    this.setState({x2:this.state.x2 - screenWidth*0.8})
                                }
                            }}
                            />
                        <ScrollView horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    pagingEnabled={true}
                                    ref={(scrollView) => { this._playscrollView = scrollView;}}
                        >
                            {
                                this.state.playList.map((item,i) =>
                                    <View key={i} style={{flex:1,width:screenWidth*0.8,alignItems:'center'}}>
                                        <Text>{item}</Text>
                                    </View>)
                            }
                        </ScrollView>
                            <Icon name={'add'} onPress={() => {
                                if (this._indexplay !== this.state.playList.length - 1){
                                    this._playscrollView.scrollTo({x:this.state.x2 + screenWidth*0.8});
                                    this._indexplay++;
                                    this.setState({x2:this.state.x2 + screenWidth*0.8})
                                }
                            }}
                            />
                        </View>
                        <Button block style={[{borderRadius:10,marginTop:8}]} onPress={() => this.startTiming()}>
                            <Text>开始专注</Text>
                        </Button>
                        </Form>
                    </View>
                ) : (
                    <View style={{flex:1}}>
                        <View>
                            <Modal
                                animationType='fade'
                                transparent={this.state.modalTransparent}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {this.setModalVisible(false)}}
                                style={{borderColor:'#888'}}
                            >
                                <View style={[styles.container, modalBackgroundStyle]}>
                                    <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                                        <Text>确认放弃此次专注吗？</Text>
                                        <Grid>
                                            <Col style={[styles.gridStyle, {height:50}]}>
                                                <Button transparent full
                                                        onPress={() => this.uncommonTimesUp()}
                                                        style={styles.buttonStyle}
                                                >
                                                    <Text style={[{color:'red'}]}>确认</Text>
                                                </Button>
                                            </Col>
                                            <Col style={[styles.gridStyle, {height:50}]}>
                                                <Button transparent full
                                                        onPress={() => {
                                                            this.setModalVisible(false);
                                                            DeviceEventEmitter.emit('abandonCanceled');
                                                        }}
                                                        style={styles.buttonStyle}
                                                >
                                                    <Text>取消</Text>
                                                </Button>
                                            </Col>
                                        </Grid>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <Tiktok isPlaySound = {!(this._indexplay === 0)}
                                choose = {this._indexplay === 0? undefined:this._indexplay - 1}
                                timee={parseInt(this.state.timeList[this._indextime]) * 60}
                                onAbandon={() => this.setModalVisible(true)}
                                tag={this.state.tag}
                        />
                    </View>
                )}
            </View>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        height:100,
        alignItems: 'center',
    },
    gridStyle:{
        justifyContent:'center',
        alignItems:'center',
    },
    buttonStyle:{
        alignSelf:'center',
    }
});
