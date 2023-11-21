import { MapContainer, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";
import "../index.css";

export default function Map({ children }) {
  return (
    <MapContainer
      className="fullscreenmap"
      center={(0, 0)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}

Map.propTypes = {
  children: PropTypes.node,
};
