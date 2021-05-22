import './InfoPanel.css';

import Map from './Map'
import InfoItem from './InfoItem'

const InfoPanel = ({ data }) => {
    const flightInfo = data.filter(el => el[0] === 'H');
    const flightRoute = data.filter(el => el[0] === 'B');
    let route = [];
    let startPoint;
    let endPoint;
    let startTime;
    let endTime;

    const searchInfo = el => {
        if (el.includes('PILOT')) {
            return <InfoItem
                key={el}
                infoTitle='Pilot:'
                infoText={`${el.split(':')[1]}`}
            />;
        } else if (el.includes('LIDERTYPE')) {
            return <InfoItem
                key={el}
                infoTitle='Rodzaj paralotni:'
                infoText={`${el.split(':')[1]}`}
            />;
        } else if (el.includes('COMPETITIONID')) {
            return <InfoItem
                key={el}
                infoTitle='ID zawodów:'
                infoText={`${el.split(':')[1]}`}
            />;
        } else if (el.includes('CLASS')) {
            return <InfoItem
                key={el}
                infoTitle='Klasa zawodów:'
                infoText={`${el.split(':')[1]}`}
            />;
        } else if (el.includes('GPSDATUM')) {
            return <InfoItem
                key={el}
                infoTitle='Punkt odniesienia GPS:'
                infoText={`${el.split(':')[1]}`}
            />;
        } else if (el.includes('DTE')) {
            let date;
            if (el.includes(':')) {
                date = el.split(':')[1].slice(0, 6);
            } else {
                date = el.slice(5);
            }
            return <InfoItem
                key={el}
                infoTitle='Data:'
                infoText={`${date.slice(0, 2)}.${date.slice(2, 4)}.${date.slice(4, 6)}`}
            />;
        };
    };

    const searchRoute = (el, id) => {
        let lat = (parseInt(el.slice(7, 9)) + el.slice(9, 14) / 60000).toFixed(6) * 1;
        let lng = (parseInt(el.slice(15, 18)) + el.slice(18, 23) / 60000).toFixed(6) * 1;

        if (el.slice(14, 15) === 'S') {
            lat *= -1;
        };
        if (el.slice(23, 24) === 'W') {
            lng *= -1;
        };

        route.push(
            {
                lat,
                lng
            }
        );

        if (id === 0) {
            startPoint = {
                lat,
                lng
            }
            startTime = {
                hour: el.slice(1, 3),
                minute: el.slice(3, 5),
                second: el.slice(5, 7)
            }
        };

        if (id === flightRoute.length - 1) {
            endPoint = {
                lat,
                lng
            }
            endTime = {
                hour: el.slice(1, 3),
                minute: el.slice(3, 5),
                second: el.slice(5, 7)
            }
        };
    };

    const pilotInfo = flightInfo.map(el => searchInfo(el));
    flightRoute.map((el, id) => searchRoute(el, id));

    return (
        <section id='infoPanel'>
            <div className="map">
                <Map
                    startPoint={startPoint}
                    endPoint={endPoint}
                    route={route}
                />
            </div>
            <div className="pilotInfo">
                <h2>Informacje o locie</h2>
                {pilotInfo}
                <InfoItem
                    infoTitle='Godzina startu:'
                    infoText={`${startTime.hour}:${startTime.minute}:${startTime.second}`}
                />
                <InfoItem
                    infoTitle='Godzina lądowania:'
                    infoText={`${endTime.hour}:${endTime.minute}:${endTime.second}`}
                />
                <InfoItem
                    infoTitle='Współrzędne startu:'
                    infoText={`${startPoint.lat}  ${startPoint.lng}`}
                />
                <InfoItem
                    infoTitle='Współrzędne lądowania:'
                    infoText={`${endPoint.lat}  ${endPoint.lng}`}
                />
            </div>
        </section>
    );
}

export default InfoPanel;