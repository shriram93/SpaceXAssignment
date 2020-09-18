import React, { useEffect, useRef, useState } from 'react';
import ToggleButton from '../toggle-button/ToggleButton';
import queryString from 'query-string'
import history from '../../history';
import './LaunchFilter.scss';

const generateLaunchYear = (startYear, endYear, selectedLaunchYear, updateLaunchYear) => {
    const launchYears = [];
    for (let currentYear = startYear; currentYear <= endYear; currentYear++) {
        launchYears.push(currentYear);
    }
    return (
        <div className="launch-filter__container">
            {launchYears.map(launchYear =>
                <div key={launchYear} className="launch-filter__container__item">
                    <ToggleButton storeValue={launchYear} checked={launchYear === selectedLaunchYear} callback={updateLaunchYear}>{launchYear}</ToggleButton>
                </div>
            )}
        </div>);
}


const LaunchFilter = () => {
    const [launchYear, setLaunchYear] = useState(null);
    const [launchSuccess, setLaunchSuccess] = useState(null);
    const [landSuccess, setLandSuccess] = useState(null);
    const startYear = useRef(null);
    const endYear = useRef(null);

    useEffect(() => {
        endYear.current = new Date().getFullYear();
        startYear.current = endYear.current - 14;
        const parsedQueryString = queryString.parse(window.location.search);
        if (parsedQueryString['launch_success']) {
            setLaunchSuccess(parsedQueryString['launch_success'] === 'true' ? true : false)
        }
        if (parsedQueryString['land_success']) {
            setLandSuccess(parsedQueryString['land_success'] === 'true' ? true : false)
        }
        if (parsedQueryString['launch_year']) {
            setLaunchYear(+parsedQueryString['launch_year']);
        }
    }, [])

    const updateQueryString = (paramater, value, removeParameter) => {
        const currentQueryString = queryString.parse(window.location.search) || {};
        const formattedQueryString = {};
        for (const queryParamter in currentQueryString) {
            formattedQueryString[queryParamter] = currentQueryString[queryParamter] ? currentQueryString[queryParamter].split(',') : []
        }
        if (removeParameter) {
            delete formattedQueryString[paramater];
        } else {
            formattedQueryString[paramater] = value
        }
        const newQueryString = queryString.stringify(formattedQueryString, { arrayFormat: 'comma' });
        history.push(`/?${newQueryString}`);
    }

    const updateLaunchSuccess = (value) => {
        setLaunchSuccess(value);
        if (value === true || value === false) {
            updateQueryString('launch_success', value);
        } else {
            updateQueryString('launch_success', null, true);
        }
    }

    const updateLandSuccess = (value) => {
        setLandSuccess(value);
        if (value === true || value === false) {
            updateQueryString('land_success', value);
        } else {
            updateQueryString('land_success', null, true);
        }
    }

    const updateLaunchYear = (value) => {
        setLaunchYear(value);
        if (value) {
            updateQueryString('launch_year', value);
        } else {
            updateQueryString('launch_year', null, true);
        }
    }

    return (
        <div className="launch-filter">
            <h3>Filters</h3>
            <div className="launch-filter__content">
                <p className="launch-filter__header">Launch Year</p>
                {startYear.current && endYear.current && generateLaunchYear(startYear.current, endYear.current, launchYear, updateLaunchYear)}
                <p className="launch-filter__header">Successful Launch</p>
                <div className="launch-filter__container">
                    <div className="launch-filter__container__item">
                        <ToggleButton storeValue={true} checked={launchSuccess === true} callback={updateLaunchSuccess}>True</ToggleButton>
                    </div>
                    <div className="launch-filter__container__item">
                        <ToggleButton storeValue={false} checked={launchSuccess === false} callback={updateLaunchSuccess}>False</ToggleButton>
                    </div>
                </div>
                <p className="launch-filter__header">Successful Landing</p>
                <div className="launch-filter__container">
                    <div className="launch-filter__container__item">
                        <ToggleButton storeValue={true} checked={landSuccess === true} callback={updateLandSuccess}>True</ToggleButton>
                    </div>
                    <div className="launch-filter__container__item">
                        <ToggleButton storeValue={false} checked={landSuccess === false} callback={updateLandSuccess}>False</ToggleButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LaunchFilter;