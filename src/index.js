import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Link } from "react-router-dom"
import axios from "axios"
import Home from "./components/Home"
import Trinkets from "./components/Trinkets"
import Trinket from "./components/Trinket"
import "./styles.css"
import Create from './components/Create'
import Edit from './components/Edit'

class App extends React.Component {
	state = {
		items: []
	}

	updateItems = (items) => {
		this.setState({
			items
		})
	}

	componentDidMount() {
		axios.get('http://localhost:3333/items')
			.then(response => {
				this.setState({
					items: response.data
				})
			})
			.then(() => {
				return axios.get('http://localhost:3333/')
			})
			.then(response => {
				console.log(response.data)
			})
			.catch(err => {
				console.log('Error:', err)
			})
	}

	render() {
		const { items } = this.state
		
		return (
			<div className="App">
				<nav>
					<h1 className="store-header">Jason's Trinkets</h1>
					<div className="nav-links">
						<Link to="/">Home</Link>
						<Link to="/trinkets">Trinkets</Link>
						<Link to='/new'>New</Link>
					</div>
				</nav>

				<Route path="/" exact render={(props) => <Home {...props} items={items} />} />
				<Route path="/trinkets" exact render={(props) => <Trinkets {...props} items={items} />} />
				<Route path="/trinket/:id" render={(props) => <Trinket {...props} items={items} />} />
				<Route exact path = '/new' render = {(props) => <Create {...props} updateItems = {this.updateItems}/>} />
				<Route exact path = '/edit/:id' render = {(props) => <Edit {...props} updateItems = {this.updateItems}/>} />
			</div>
		)
	}
}

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
)
