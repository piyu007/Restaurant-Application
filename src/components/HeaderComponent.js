import React, { Component } from 'react';
import {FormGroup, Form, Label, Input, Button, Navbar, NavbarBrand, Jumbotron, Nav, NavbarToggler, NavItem, Collapse, Modal, ModalHeader ,ModalBody} from 'reactstrap';
import {NavLink} from "react-router-dom";
import {baseUrl} from "../shared/baseUrl";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin (event) {
        this.toggleModal();
        alert(this.username.value + this.password.value + this.remember.checked);
        event.preventDefault();
    }

    toggleNav () {
        this.setState({isNavOpen: !this.state.isNavOpen})
    }
    toggleModal () {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    render() {
        return(
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand href="/" className="mr-auto">
                            <img src={baseUrl + 'images/logo.png'} height="30" width="41"
                            alt="Ristorante Con Fusion"/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink to="/home" className="nav-link">
                                        <span className="fa fa-home fa-lg">Home</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/aboutus" className="nav-link">
                                        <span className="fa fa-info fa-lg">About Us</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/menu" className="nav-link">
                                        <span className="fa fa-list fa-lg">Menu</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/contact" className="nav-link">
                                        <span className="fa fa-address-book fa-lg">Contact</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav navbar className="ml-auto">
                                <NavItem>
                                    <Button onClick={this.toggleModal} outline>
                                        <span className="fa fa-sign-in fa-lg">Login</span>
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                       innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                       innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                           innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Header;