import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';

// react rules - when using this to reference an instance inside a class method
// you need to bind the method to that exact instance when constructing the object
// (because the method cannot inherently know what this references,
// and if we are using it - we are potentially changing it)
// that way, the method can access the state of the instance (this.state)
// and methods (setState - React method that allows changing the state of the component)

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this); // binding toggle method to component instance
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        }); // setting the state to the other value - if the state was true, sets it to false and so on
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
        </Navbar>;
    }
}
export default withRouter(AppNavbar);