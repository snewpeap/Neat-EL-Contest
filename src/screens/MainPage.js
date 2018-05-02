import React, { Component } from 'react';
import {Button, Container, Content, Footer, FooterTab, Header, Icon, Text} from "native-base";
import HistoryPage from "./HistoryPage";
import TimerPage from "./TimerPage";
import SocialPage from "./SocialPage";

class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            historyTab: false,
            timerTab: true,
            socialTab: false,
        };
    }
    Tab1() {
        this.setState({
            historyTab: true,
            timerTab: false,
            socialTab: false,
        });
    }
    Tab2(){
        this.setState({
            historyTab: false,
            timerTab: true,
            socialTab: false,
        });
    }
    Tab3(){
        this.setState({
            historyTab: false,
            timerTab: false,
            socialTab: true,
        });
    }
    render(){
        return(
            <Container>
                <Content>
                    {this.state.historyTab === true && <HistoryPage/>}
                    {this.state.timerTab === true && <TimerPage/>}
                    {this.state.socialTab === true && <SocialPage/>}
                </Content>
                <Footer>
                    <FooterTab>
                        <Button active={this.state.historyTab} onPress={() => this.Tab1()}>
                            <Icon active={this.state.historyTab} name="paper" />
                            <Text>专注记录</Text>
                        </Button>
                        <Button active={this.state.timerTab} onPress={() => this.Tab2()}>
                            <Icon active={this.state.timerTab} name="alarm" />
                            <Text>计时器</Text>
                        </Button>
                        <Button active={this.state.socialTab} onPress={() => this.Tab3()}>
                            <Icon active={this.state.socialTab} name="person" />
                            <Text>社交</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default MainPage;
