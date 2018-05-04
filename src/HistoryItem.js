import React, {Component} from 'react';
import {Body, Card, CardItem, Text} from "native-base";

export default class HistoryItem extends Component{
    onDelete(){
        this.props.onDelete();
    }
    render(){
        return(
            <Card>
                <CardItem bordered={true}>
                    <Body>
                    <Text>任务名称：{this.props.detail.titl}</Text>
                    <Text>专注时长：{this.props.detail.lengt}</Text>
                    <Text>日期：{this.props.detail.datee}</Text>
                    </Body>
                </CardItem>
                <CardItem footer button onPress={() => this.onDelete()}>
                    <Text style={{color: 'red'}}>删除</Text>
                </CardItem>
            </Card>
        )
    }
}
