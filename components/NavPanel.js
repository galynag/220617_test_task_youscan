/**
 * Created by Galina on 22.06.2017.
 */
import React, {Component} from 'react';
import {Row,Col,Navbar,NavItem} from 'react-materialize';


export default class NavPanel extends Component {
    render() {
        return(
            <Row>
                <Col s={12} className="#212121 grey darken-4">
                    <div className="container" id="nav-box">
                            <img src="./img/movie_db.png" alt=""/>
                        <Navbar href="#"  className="#212121 grey darken-4" left>
                            <NavItem href="#">Home</NavItem>
                            <NavItem href="#">My Favorite</NavItem>
                            <NavItem href="#">Contacts</NavItem>

                        </Navbar>
                    </div>
                </Col>
            </Row>
        )
    }
}