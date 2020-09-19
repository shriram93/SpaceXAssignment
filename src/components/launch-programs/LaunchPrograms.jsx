import React, { Fragment, useEffect, useState } from 'react';
import SpaceXLaunchApi from '../../apis/SpaceXLaunch';
import LaunchCard from '../launch-card/LaunchCard';
import LaunchFilter from '../launch-filter/LaunchFilter';
import './LaunchPrograms.scss';
import queryString from 'query-string'

const formatLaunchPrograms = (launchPrograms) => {
    const formattedLaunchPrograms = launchPrograms.map(launchProgram => {
        const { mission_name, flight_number, launch_year, launch_success, mission_id, rocket, links } = launchProgram;

        return {
            missonName: mission_name,
            flightNumber: flight_number,
            launchYear: launch_year,
            launchSuccess: launch_success,
            missionIds: mission_id,
            imageUrl: links.mission_patch_small,
            landSuccess: rocket.first_stage.cores[0].land_success
        }

    });
    return formattedLaunchPrograms;
}


const LaunchPrograms = ({ location }) => {
    const [launchPrograms, setLaunchPrograms] = useState([]);

    useEffect(() => {
        const parsedQueryString = queryString.parse(window.location.search);
        (async () => {
            const result = await SpaceXLaunchApi.get('/v3/launches', {
                params: {
                    limit: 100,
                    ...parsedQueryString
                }
            });
            setLaunchPrograms(formatLaunchPrograms(result.data || []));
        })();
    }, [location]);

    return (
        <div className="launch-program">
            <div className="launch-program__filter">
                <LaunchFilter />
            </div>
            <div className="launch-program__cards">
                {launchPrograms.map(launchProgram => (
                    <div key={launchProgram.flightNumber} className="launch-program__cards__card">
                        <LaunchCard {...launchProgram} />
                    </div>
                ))}
                {launchPrograms.length < 5 && (
                    <Fragment>
                        <div className="launch-program__cards__card launch-program__cards__card--dummy" />
                        <div className="launch-program__cards__card launch-program__cards__card--dummy" />
                        <div className="launch-program__cards__card launch-program__cards__card--dummy" />
                        <div className="launch-program__cards__card launch-program__cards__card--dummy" />
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export default LaunchPrograms;
