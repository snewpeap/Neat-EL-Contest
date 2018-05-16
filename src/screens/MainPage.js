import React, { Component } from 'react';
import {
    Container,
    Content,
    Text,
    Button,
    StyleProvider,
    View
} from 'native-base';
import App from '../App';
import getTheme from "../../native-base-theme/components"
import variables from "../../native-base-theme/variables/commonColor"
import {ImageBackground,StyleSheet,Alert} from "react-native";


class MainPage extends Component{
    constructor(props){
        super(props);
            this.state = {
            isTrue : false,
        };
    }
    render(){
        if(this.state.isTrue){
            return(
                <StyleProvider style = {getTheme(variables)}>
                <App/>
            </StyleProvider>
                )
        }
        else{return(
            <View style={{flex : 1}}>
                <ImageBackground source={require('../../lib/Image/third.png')} style={styles.image}>
                    <Text style={styles.welcomText}>欢迎使用</Text>
                <Button  rounded  block onPress={()=>this.setState({isTrue : true})}>
                   <Text style={styles.buttonText}> 进入 </Text>
               </Button>
                </ImageBackground>
            </View>

        )}
    }
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent:'flex-end',
        alignItems:'center',
        paddingBottom:50,
    },
    buttonText : {
        color:'#effcec',
       // fontWeight: 'bold',
        fontSize:27,
    },
    welcomText : {
        flex : 1,
        fontSize:40,
        color : '#5effd3',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    }
});
module.exports = MainPage;