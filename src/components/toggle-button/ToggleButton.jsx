import React from 'react';
import './ToggleButton.scss';

const ToggleButton = (props) => {
    const { storeValue, checked, callback } = props;

    const handleClick = () => {
        const newState = checked ? null : storeValue;
        if (callback) {
            callback(newState);
        }
    }

    return (
        <button
            className={`toggle-button ${checked ? 'toggle-button--selected' : ''}`}
            onClick={handleClick}>{props.children}
        </button>
    )
}

export default ToggleButton;