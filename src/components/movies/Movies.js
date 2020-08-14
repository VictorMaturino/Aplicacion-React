
import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { API_BASE_URL } from '../../config';
import ReactDOM from 'react-dom';
import MaterialTable from '../../../node_modules/material-table';
//import MaterialTable from 'material-table';

export default class App extends React.Component {
    constructor(){
        super();
        this.state = {
            data: null,
            loaded: true,
            error: null
        }
    }
    baseURL = API_BASE_URL+'/movies'
    
    getData = (ev)=>{
        this.setState({loaded:false, error: null});
        let url = this.baseURL;
        
        let req = new Request(url, {
            method: 'GET'
        });
        
        fetch(req)
        .then(response=>response.json())
        .then(this.showData)
        .catch(this.badStuff)
    }
    showData = (data)=>{
        this.setState({loaded:true, data});
        console.log(data);
    }
    badStuff = (err) => {
        this.setState({loaded: true, error: err.message});
    }
    onDelete(id) {
        this.setState({loaded:false, error: null});
        let url = this.baseURL + '/'+ id;
        
        let req = new Request(url, {
            method: 'DELETE'
        });
        
        fetch(req)
        .then(this.showData)
        .then(this.getData)
    }
    onIncrease(id) {
        this.setState({loaded:false, error: null});
        let url = this.baseURL + '/'+ id + '/count';
        
        let req = new Request(url, {
            method: 'POST'
        });
        
        fetch(req)
        .then(this.showData)
        .then(this.getData)
    }
    render() {
        return (
           
            <ScrollView >
                { !this.state.loaded && (
                    <Text>LOADING</Text>
                )}
                <Button title="lISTADO DE PELICULAS"
                    onPress={this.getData} />
                { this.state.error && (
                    <Text style={styles.err}>{this.state.error}</Text>
                )}
                { this.state.data && this.state.data.length > 0 && (
                    this.state.data.map( comment => (
                        <Text key={comment.id} style={styles.txt}>
                            <table>
                            <tr>
                            <td>
                                <h1>{ comment.title }</h1>
                           
                           </td>
                           <td>
                               Likes:
                           </td>
                           <td>
                           { comment.count }
                           </td>
                           </tr>
                           <tr>
                           <td>
                           { comment.descripcion }
                           </td>
                           </tr>
                           <tr text-align="right">
                           <button onClick={() => this.onDelete(comment.id)}><img src="https://cdn4.iconfinder.com/data/icons/business-office-and-internet-4-9/65/184-512.png" width="30px" height="30px"></img></button>
                           <button onClick={()=> this.onIncrease(comment.id)}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Facebook_like_thumb.png/1196px-Facebook_like_thumb.png" width="35px" height="30px"></img></button>
                           
                           </tr>
                           <tr>
                               <td>
                                   <img src={comment.imagen} width="100px" height="150px"></img>
                               </td>
                           </tr>
                           </table>
                           <hr></hr>
                           </Text>
                    ))
                )}
            </ScrollView>
           
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        fontSize: 18,
        color: '#333',
        fontFamily: 'Arial'
    },
    err:{
        color: 'red',
        fontSize: 30,
        fontWeight: 'bold'
    },
    button: {

        backgroundColor: 'transparent'
    },
    h1: {
        color: 'gold'
    }
});