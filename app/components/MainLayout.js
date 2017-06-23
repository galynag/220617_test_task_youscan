/**
 * Created by Galina on 22.06.2017.
 */
import React, {Component} from 'react';
import NavPanel from './NavPanel';
import FooterPanel from './FooterPanel';
import Home from './Home';

export default class MainLayout extends Component {
    render() {
        return(
            <div>
                <NavPanel />
                <Home />
                {/*<main className="container">*/}
                    {/*{this.props.children}*/}
                {/*</main>*/}
                <FooterPanel />
            </div>
        )
    }
}