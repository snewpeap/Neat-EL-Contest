import React, {Component} from 'react';
import {Badge, Body, Button, Card, CardItem, Icon, Left, Right, Text} from "native-base";
import moment from "moment";

export default class PostItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            isFavorite: false,
        };
    }
    componentWillMount(){
        if (this.props.favor){
            this.setState({isFavorite:true});
        }else {
            this.setState({isFavorite:this.props.detail.isFavorite});
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({isFavorite:nextProps.detail.isFavorite})
    }
    onDelete(){
        this.props.onDelete();
    }
    onFavorite(){
        const prev = this.state.isFavorite;
        let that = this;
        this.props.onFavorite(this.state.isFavorite,function (res) {
            if (res){
                that.setState({isFavorite:!prev});
            }
        });
    }
    render(){
        let color = this.props.detail.type === 'jingyan'?'#c3e3eb':'#ffffd4';
        return(
            <Card style={{flex:0,backgroundColor:color,borderTopStartRadius:20,borderTopEndRadius:20,borderBottomRightRadius:20}}>
                <CardItem bordered style={{backgroundColor:color,borderRadius:20}}>
                    <Body>
                    <Text style={{fontSize:20}}>{this.props.detail.author.nickname}:</Text>
                    </Body>
                    <Right>
                        <Badge style={{backgroundColor:`#${this.props.detail.color}`}}>
                            <Text style={{color:'white'}}>{`${this.props.detail.type === 'normal'?'动态':'经验'} #${this.props.detail.tag}#`}</Text>
                        </Badge>
                    </Right>
                </CardItem>
                <CardItem style={{backgroundColor:color}}>
                    <Body>
                    <Text>{this.props.detail.content}</Text>
                    </Body>
                </CardItem>
                <CardItem style={{backgroundColor:color,borderRadius:20}}>
                    <Left>
                        <Text note>{moment(this.props.detail.date).format('YYYY-MM-DD HH:mm')}</Text>
                    </Left>
                    {this.props.detail.type === 'jingyan'?(
                        <Body style={{flexDirection:'row-reverse'}}>
                            <Icon name='star'
                                  active={this.state.isFavorite}
                                  style={{color: this.state.isFavorite ? 'yellow' : 'gray',marginTop:8}}
                                  onPress={() => this.onFavorite()}/>
                        </Body>
                    ):(null)
                    }
                    <Right>
                {this.props.detail.author._id === userId ? (
                            <Button transparent textStyle={{color: '#05f'}} onPress={() => this.onDelete()}>
                                <Text style={{color:'red'}}>删除</Text>
                            </Button>
                ) : (null)
                }
                    </Right>
                </CardItem>
            </Card>
        )
    }
}
