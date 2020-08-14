import React, { Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { withAuth } from '@okta/okta-react';
import { API_BASE_URL } from '../../config';
import MaterialTable from '../../../node_modules/material-table';
import Movies from './Movies';
export default withAuth(class MovieForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            title: '',
            descripcion: '',
            imagen: '',
            errorMessage: '',
            error: false,
            isLoading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
      }

      handleSubmit = (e) => {
        e.preventDefault()
        const values = JSON.stringify(this.state)
        alert(values)
      }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        });

        const response = await fetch(API_BASE_URL + '/movies', {
            method: 'POST',
            body: JSON.stringify({
                "title": this.state.title,
                "descripcion": this.state.descripcion,
                "imagen": this.state.imagen
            })
        });
        const data = await response.json();

        if (data.errors) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: data.errors
            });
        } else {
            this.setState({
                title: '',
                descripcion: '',
                imagen: '',
                isLoading: false,
                error: false,
                errorMessage: ''
            });
            //this.props.onAddition(data);
        }
    }

    render() {
        const { title, descripcion, imagen } = this.state

        return (
            <Form error={this.state.error} onSubmit={this.onSubmit}>
            <div>
                <h2>Agrega una nueva película:</h2>
                <Form.Field error={this.state.error}>
                <label>Title:
                <input 
                    type="text"
                    name="title"
                    value={title} 
                    onChange={this.handleChange} 
                />
                </label>
                <br></br>
                <label>Description:
                <input 
                    type="text"
                    name="descripcion"
                    value={descripcion} 
                    onChange={this.handleChange} 
                />
                </label>
                <br></br>
                <label>Imagen:
                <input 
                    type="text"
                    name="imagen"
                    value={imagen} 
                    onChange={this.handleChange} 
                />
                </label>
                    
                   { this.state.error &&
                <Message
                    error
                    header='Error al agregar la película'
                    content={this.state.errorMessage}
                />
                }
                </Form.Field>   

                </div>
                <Button type='submit' loading={this.state.isLoading}>Agregar</Button>
                
                <div>
                    <Movies>

                    </Movies>
                </div>

            </Form>
            
        )

    }

});
