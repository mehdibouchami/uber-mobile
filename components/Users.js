import React, { Component } from 'react';
import { List, ListItem, Left, Body, Right, Thumbnail, Text, Icon } from "native-base";
import axios from "axios";


export default class Users extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             users: []
        }
    }
    

    handleCancel = () => this.setState({ result: 'cancelled', open: false })
    componentDidMount() {

        axios.get('http://192.168.1.7:5000/api/user', { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMGM2ZTI1NjcwMGJiMDFmN2I3YTI1ZCIsInR5cGUiOiJjbGllbnQiLCJpYXQiOjE2MTE5NjAwNjAsImV4cCI6MTYxMjA0NjQ2MH0.PB7q6uzc2O79ivSrweMlZCPkYzP3OrFp1cBdmL8jIgQ' } })
            .then(res => {
                const users = res.data;
                this.setState({ users });
            })
    }
    render() {
        return (
             <List>
             {this.state.users.map((user)=>
             <ListItem  key={user._id}>
               <Body>
                <Text>{user.nom}</Text>
                <Text note>{user.email}</Text>
                <Text note>{user.type}</Text>
               </Body>
       
             </ListItem>
        
            
           
          )}
          </List>
        )
    }
}