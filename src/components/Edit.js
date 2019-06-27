import React from 'react';
import axios from 'axios';

class Edit extends React.Component {
    constructor(props){
        super(props);
            this.state = {
                name: "",
                price: 0,
                imageUrl: 'https://placekitten.com/200/300',
                description: '',
                shipping: '',
                errorMessage: null
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateTrinket = (e) => {
        const id = this.props.match.params.id
        const { 
            name, price, imageUrl, description, shipping 
        } = this.state

        const payload = {
            name, price, imageUrl, description, shipping
        }

        e.preventDefault()
        axios.put(`http://localhost:3333/items/${id}`, payload)
            .then((response) => {
                console.log(response)
                this.props.updateItems(response.data)
                this.setState({
                    errorMessage: null
                })

                this.props.history.push('/trinkets')
            })
            .catch((err) => {
                this.setState({
                    errorMessage: err.response.data.error
                })
            })
    }

    deleteItem = (e) => {
        e.preventDefault()
        const id = this.props.match.params.id

        axios.delete(`http://localhost:3333/items/${id}`)
            .then((response) => {
                console.log(response)
                this.props.updateItems(response.data)
                this.setState({
                    errorMessage: null
                })

                this.props.history.push('/trinkets')
            })
            .catch((err) => {
                this.setState({
                    errorMessage: err.response.data.error
                })
            })
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3333/items/${id}`)
            .then((response) => {
                this.setState({
                    name: response.data.name,
                    price: response.data.price,
                    imageUrl: response.data.imageUrl,
                    description: response.data.description,
                    shipping: response.data.shipping
                })
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.response.data.error
                })
            })
    }

    render() {
        const { name, price, imageUrl, description, shipping, errorMessage } = this.state
        return (
            <form onSubmit = {this.updateTrinket}>
                <h2>Edit Trinket</h2>

                <p>{errorMessage}</p> 

                <input type = 'text' name = 'name' placeholder = 'Name' value = {name} onChange = {this.handleChange} />
                <input type = 'number' name = 'price' placeholder = 'Price' value = {price} onChange = {this.handleChange} />
                <input type = 'text' name = 'imageUrl' placeholder = 'Image URL' value = {imageUrl} onChange = {this.handleChange} />
                <input type = 'text' name = 'description' placeholder = 'Description' value = {description} onChange = {this.handleChange} />
                <input type = 'text' name = 'shipping' placeholder = 'Shipping' value = {shipping} onChange = {this.handleChange} />
                <button type = 'submit'>Update</button>
                <button onClick = {this.deleteItem}>Delete</button>
            </form>
        )
    }
}

export default Edit;