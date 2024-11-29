import React, { Component } from 'react'; // class based on Component class from React
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClientList from './ClientList';
import ClientEdit from "./ClientEdit";

// Two main components in React
// class component type - extending Component from React, methods and local states
// functional component type - useState and useEffect hooks - tbc

class App extends Component {
    // state - object that contains data that dynamically renders the UI during the lifespan of the component
    // constructor  is implicitly called when we initialize the state component
    state = {
        clients: [] // initializing state object with an empty array
    }

    // life cycle method that is called immediately
    // getting data from the server
    async componentDidMount() {
        const response = await fetch("/clients"); // fetch - HTTP GET request for /clients endpoint
        const body = await response.json(); // parsing the response as a JSON string
        this.setState({clients: body}); // setting the state of the component - adding clients
    }

    // object destructuring
    // const person = { name="John", email="john@outlook.com" }; // key - value object

    // {clients.map(client => <div key={client.id}>{client.name} ({client.email})</div>)}
    // going through every client in the response and mapping it to write the contents in the div tag
    // setting the key as the client id for later referencing
    // const name = person.name; const email = person.email; // not practical
    // const {name,email} = person; // destructuring

    // using React router to navigate through the app - container for all Route components
    // Switch - only one root can be used at once, when rendered checks all the Route components
    // and shows the first match
    // Route component - path defines the URL and if exact is defined, that means that is the only URL for accessing the route
    // the ClientEdit one hasn't got the exact prop, because it can be accessed through clients/{id} for editing or clients/new for adding a new client
    // it has a dynamic parameter :id which can be accessed through this.props.match.params.id
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/clients' exact={true} component={ClientList}/>
                    <Route path='/clients/:id' component={ClientEdit}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
