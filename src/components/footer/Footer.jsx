import React from 'react';
import './Footer.scss';

const Footer = (props) => {
    const {developerName} = props;
    return (<div className="footer">
        <span>Developed by: </span><span>{developerName}</span>
    </div>)
}

export default Footer;