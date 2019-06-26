import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Link } from "react-router-dom"
import axios from "axios"
import Home from "./components/Home"
import Trinkets from "./components/Trinkets"
import Trinket from "./components/Trinket"
import "./styles.css"

class App extends React.Component {
	state = {
		items: []
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
					</div>
				</nav>

				<Route path="/" exact render={(props) => <Home {...props} items={items} />} />
				<Route path="/trinkets" exact render={(props) => <Trinkets {...props} items={items} />} />
				<Route path="/trinket/:id" render={(props) => <Trinket {...props} items={items} />} />
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
