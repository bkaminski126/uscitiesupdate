import Map from "./components/Map";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./index.css";

let position = [50, 0];

function App() {
  return (
    <>
      <MapContainer className="fullscreenmap" center={position} zoom={8}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}

export default App;
