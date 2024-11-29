import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'; // withRouter - accessing route data, mostly parameters
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';

class ClientEdit extends Component {

    // initial value, to be set later
    emptyItem = {
        name: '',
        email: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem // initial state of the object, before fetching the result
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // accessing route parameters to check whether the parameter is new or not
    // if not, we are editing the existing client so we need to set the state to their info
    // we await the result from /clients/{id} and transform it into a json string, and then set the state with that data
    // .json() is also an async operation (needs some time to complete) so we need to wrap the fetch await into json await
    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const client = await (await fetch(`/clients/${this.props.match.params.id}`)).json();
            this.setState({item: client});
        }
    }

    // handleChange method is used for changing some or all of the form values
    // we save the target element - the one that the event was called upon (usually input tags, buttons or select drop down menus)
    // and then we access the value and name
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    // submitting the form
    // state object example: this.state.item = { name: 'Jelena', email: 'jelena@example.com' }
    // the request is sent based on whether the parameter item.id is defined
    // if not, we are not changing the existing client but creating a new one so we use POST method request
    // if it's defined, we are modifying an existing client so we use PUT method request
    // the headers are standard - JSON is expected as a response format
    // the body parameter is used to convert the item object to JSON, for example to '{"name":"Jelena","email":"jelena@example.com"}'

    async handleSubmit(event) {
        event.preventDefault(); // prevents refreshing the page
        const {item} = this.state; // setting the id, name, email from the state object

        await fetch('/clients' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/clients'); // history.push() is used in React Router to change the URL and redirect the user
    }

    // Container component - React component from reactstrap (React's Bootstrap CSS framework)
    // used to set margins and padding according to Bootstrap rules - so we don't have to care about responsive web design basically

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Client' : 'Add Client'}</h2>; // the title of the page based on the action new/{id}

        // onSubmit={this.handleSubmit} - on submitting the form, method handleSubmit is called
        // onChange={this.handleChange} - on changing the value of the input tag, call the handleChange method
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={item.email || ''}
                               onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/clients">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(ClientEdit); // with Router - the user can navigate through tabs