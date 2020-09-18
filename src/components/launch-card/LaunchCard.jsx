import React from 'react';
import './LaunchCard.scss';

const LaunchCard = (props) => {
    const { imageUrl, missonName, flightNumber, launchYear, launchSuccess, landSuccess, missionIds } = props;
    return (
        <div className="launch-card">
            <div className="launch-card__image">
                <img src={imageUrl} alt={missonName} />
            </div>
            <div className="launch-card__name">
                <p>{`${missonName} #${flightNumber}`}</p>
            </div>
            {missionIds && missionIds.length > 0 && <p className="launch-card__data">
                <span className="launch-card__data__label">Mission ids:</span>
                <span className="launch-card__data__value">
                    <ul>
                        {missionIds.map(missionId => <li key={missionId}>{missionId}</li>)}
                    </ul>
                </span>
            </p>}
            <p className="launch-card__data">
                <span className="launch-card__data__label">Launch Year:</span>
                <span className="launch-card__data__value">{launchYear}</span>
            </p>
            <p className="launch-card__data">
                <span className="launch-card__data__label">Successful Launch:</span>
                <span className="launch-card__data__value">{launchSuccess ? 'true' : 'false'}</span>
            </p>
            <p className="launch-card__data">
                <span className="launch-card__data__label">Successful Landing:</span>
                <span className="launch-card__data__value">{landSuccess ? 'true' : 'false'}</span>
            </p>
        </div>
    )

}

export default LaunchCard;


