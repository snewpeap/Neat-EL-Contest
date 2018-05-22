import React, {Component} from 'react';
import {Body, Button, Card, CardItem, Left, Right, Text} from "native-base";
import moment from "moment";

export default class PostItem extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    onDelete(){
        this.props.onDelete();
    }
    render(){
        return(
            <Card style={{flex:0}}>
                <CardItem bordered>
                    <Body>
                    <Text style={{fontSize:20,margin:0}}>{this.props.detail.author.nickname}:</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                    <Text>  {this.props.detail.content}</Text>
                    </Body>
                </CardItem>
                {this.props.detail.author._id === userId ? (
                    <CardItem>
                        <Left>
                            <Text note>{moment(this.props.detail.create_at).format('YYYY-MM-DD')}</Text>
                        </Left>
                        <Body>
                            <Button transparent textStyle={{color: '#05f'}}>
                                <Text>修改</Text>
                            </Button>
                        </Body>
                        <Right>
                            <Button transparent textStyle={{color: '#05f'}} onPress={() => this.onDelete()}>
                                <Text>删除</Text>
                            </Button>
                        </Right>
                    </CardItem>
                ) : (null)
                }
            </Card>
        )
    }
}
