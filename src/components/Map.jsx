import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = {
    width: '800px',
    height: '600px'
};

const Map = props => {
    const center = {
        lat: (props.startPoint.lat + props.endPoint.lat) / 2,
        lng: (props.startPoint.lng + props.endPoint.lng) / 2
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAW8pDHUOwyY8DBg8JZYjgkGcQblsBgfQs"
    });

    return isLoaded ? (
        <GoogleMap

            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
        >
            <Marker
                label='S'
                title='Miejsce startu'
                position={props.startPoint}
            />
            <Marker
                label='L'
                title='Miejsce lądowania'
                position={props.endPoint}
            />
            <Polyline
                path={props.route}
            />
        </GoogleMap>
    ) : <></>
}

export default Map