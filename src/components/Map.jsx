import { Circle, MapContainer, TileLayer, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import "../index.css";
import uscities from "../data/uscities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Map(props) {
  const c = uscities;
  const { ids, position } = props;
  const caps = [
    171, 1416, 10, 90, 24, 17, 50, 353, 53, 170, 7, 102, 272, 32, 82, 302, 1599,
    73, 2356, 1167, 9, 130, 138, 120, 1072, 1388, 152, 875, 1057, 144, 481, 42,
    514, 76, 34, 48, 160, 88, 38, 72, 3033, 41, 30, 40, 5039, 44, 222, 315, 91,
    620,
  ];

  return (
    <MapContainer
      className="fullscreenmap z-0"
      center={position}
      zoom={5}
      zoomControl={false}
    >
      {/* <Recenter lat={position[0]} lng={position[1]} /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
      />
      {ids.map((id) => (
        <Circle
          radius={Math.max(
            Math.round(
              c.population[`${id}`] / 200 +
                Math.log10(c.population[`${id}`] / 100) * 8000
            ),
            8000
          )}
          color="#ff0000"
          opacity={1}
          weight={1}
          key={id + "marker"}
          center={[c.lat[`${id}`], c.lng[`${id}`]]}
        >
          <Popup className="font-nunito font-semibold">
            {c.city_ascii[`${id}`]}, {c.state_name[`${id}`]} {caps.includes(id) && <FontAwesomeIcon className={"h-[12px]"} icon={faStar}/>}
            <br />
            {c.population[`${id}`].toLocaleString()} (rank{" "}
            {(id + 1).toLocaleString()})
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
}

Map.propTypes = {
  children: PropTypes.node,
  ids: PropTypes.array,
  position: PropTypes.array,
};
