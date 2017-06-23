/**
 * Created by Galina on 22.06.2017.
 */
import React, {Component} from 'react';
import {Row,Col,Navbar,NavItem} from 'react-materialize';
import {Link} from 'react-router';


export default class NavPanel extends Component {
    render() {
        return(
            <Row>
                <Col s={12} className="#212121 grey darken-4">
                    <div className="container" id="nav-box">
                            <img src="./img/movie_db.png" alt=""/>
                        <Navbar href="#"  className="#212121 grey darken-4" left>
                            <NavItem href="#"><Link to="/">Home</Link></NavItem>
                            <NavItem href="#"><Link to="/favorite">My Favorite</Link></NavItem>
                            <NavItem href="#"><Link to="/contacts">Contacts</Link></NavItem>

                        </Navbar>
                    </div>
                </Col>
            </Row>
        )
    }
}