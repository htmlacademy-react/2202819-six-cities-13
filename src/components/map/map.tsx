import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import {City, Offer, DetailOffer} from '../../types/offer-types';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  points: Offer[];
  selectedPoint: Offer | undefined;
  detailedOffer: DetailOffer | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map({city, points, selectedPoint, detailedOffer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            selectedPoint && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);

        if (point.location.latitude === detailedOffer?.location.latitude &&
        point.location.longitude === detailedOffer?.location.longitude) {
          marker.setIcon(currentCustomIcon);
        }
      });

      map.flyTo(
        [
          city.location.latitude,
          city.location.longitude,
        ],
        city.location.zoom
      );

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint, detailedOffer, city]);

  return (
    <div style={{height: '100%', minHeight: '500px', width: '100%', maxWidth: '1144px', margin: '0 auto'}} ref={mapRef}></div>
  );
}

export default Map;
