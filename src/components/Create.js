import React from 'react';
import axios from 'axios';

class Create extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                name: "",
                price: 0,
                imageUrl: 'https://placekitten.com/200/300',
                description: '',
                shipping: "Most of our items are in stock and will ship quickly. Orders for in-stock items placed before 5pm ET Monday through Friday, excluding Federal holidays, will ship in the US: ECONOMY SHIPPING: within 8 days, arriving no later than the 9th business day after the order was placed. STANDARD SHIPPING: within 4 days, arriving 5 business days after the order was placed. PREFERRED SHIPPING: within 2 days, arriving 3 business days after the order was placed. EXPEDITED SHIPPING: within 1 day, arriving 2 business days after the order was placed. EXPRESS SHIPPING: will ship the same day and arrive 1 business day later.",
                errorMessage: null
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createTrinket = (e) => {
        const { 
            name, price, imageUrl, description, shipping 
        } = this.state

        const payload = {
            name, price, imageUrl, description, shipping
        }

        e.preventDefault()
        axios.post('http://localhost:3333/items', payload)
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

    render() {
        const { name, price, imageUrl, description, shipping, errorMessage } = this.state
        return (
            <form onSubmit = {this.createTrinket}>
                <h2>Create New Trinket</h2>

                <p>{errorMessage}</p> 

                <input type = 'text' name = 'name' placeholder = 'Name' value = {name} onChange = {this.handleChange} />
                <input type = 'number' name = 'price' placeholder = 'Price' value = {price} onChange = {this.handleChange} />
                <input type = 'text' name = 'imageUrl' placeholder = 'Image URL' value = {imageUrl} onChange = {this.handleChange} />
                <input type = 'text' name = 'description' placeholder = 'Description' value = {description} onChange = {this.handleChange} />
                <input type = 'text' name = 'shipping' placeholder = 'Shipping' value = {shipping} onChange = {this.handleChange} />
                <button type = 'submit'>Create</button>
            </form>
        )
    }
}

export default Create;