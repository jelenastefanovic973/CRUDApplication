import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar'; // custom made component for navigation bar
import {Link} from 'react-router-dom'; // links - editing and adding new clients

class ClientList extends Component {
    // manually made constructor - we need to call the super constructor explicitly

    constructor(props) {
        super(props);
        this.state = {clients: []}; // initialization of the state object with an empty clients array
        // binding the remove method to this instance
        // remove method is now bound to the class instance and can be used to
        // access the state of the instance and component methods
        this.remove = this.remove.bind(this);
    }

    // called after rendering the component
    // HTTP GET request to "/clients", mapping it into a json string and setting the state with the response data
    componentDidMount() {
        fetch('/clients').then(response => response.json()).then(data => this.setState({clients: data}));
    }

    // removing clients by id
    // fetch function parameters - input - string/url/request object - here we are using url
    // optional parameter - init - HTTP request configuration - method, header, body...
    // return type is Promise<Response>
    // 'Accept': 'application/json' - app expects the response in a json format
    // 'Content-Type': 'application/json' - request body must be in a json format, not used currently, used for POST and PUT requests
    // after the request is fetched, we filter the clients array from the state component, using the predicate (i => i.id !== id)
    // we set the state to updated clients list
    async remove(id) {
        await fetch(`/clients/${id}`, {
            method: "DELETE", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...this.state.clients].filter(i => i.id !== id);
            this.setState({clients: updatedClients});
        });
    }

    // JSX elements - JavaScript extension for writing HTML inside of JS code - babel transforms it into JS code
    render() {
        const {clients, isLoading} = this.state; // getting clients and isLoading parameters from the state object

        if (isLoading) {
            return <p>Loading...</p>;
        }
        // mapping every client into a table row element
        // that has the client's name, email and actions - edit button and delete button
        // the edit button has a link tag that leads to /clients/{id} where id is the client's id
        // the delete button - on click calls the remove(id) method from ClientList with the client's id
        const clientList = clients.map(client => {
            return (<tr key={client.id}>
                <td style={{whiteSpace: 'nowrap'}}>{client.name}</td>
                <td>{client.email}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/clients/" + client.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(client.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>)
        })
        // when creating tables, we are using the Table tag from reactstrap
        // container fluid - responsive and flex display containers
        // fluid - takes up the whole screen so no need to manually fixing it
        // {clientList} - rendering the client list that we made earlier
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/clients/new">Add Client</Button>
                    </div>
                    <h3>Clients</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Email</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ClientList; // for importing elements later on