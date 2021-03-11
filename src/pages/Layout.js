import React, { Fragment } from 'react';
import Menu from './Menu';
function Layout(props) {
    return (
        <Fragment>
            <Menu/>
            {props.children}            
        </Fragment>
    );
}
export default Layout;