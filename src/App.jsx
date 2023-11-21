import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
import "./index.css";
import uscities from "./data/uscities";

let position = [37, -96];

function App() {
  //INIT CONSTANTS
  const c = uscities;
  const clen = Object.keys(c.city_ascii).length; //30k atm
  const citynames = Array.from(Object.values(c.city_ascii));

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const states = Array.from(Object.values(c.state_name));
  const statenames = states.filter(onlyUnique).sort();

  const abbrs = Array.from(Object.values(c.state_id));
  const abbrnames = abbrs.filter(onlyUnique).sort();

  const totalpop = 331449281; //2020 census
  const [ids, setIds] = useState([]);

  return (
    <>
      {/* header */}
      <div className="flex flex-row rounded-2xl w-full bg-clear-white fixed top-0 left-0 z-10 p-5">
        <p className="font-bold w-full text-2xl">
          How many U.S. cities can you name?
        </p>
        <img src={"./hamburger.png"} className={"h-[28px]"} />
      </div>
      {/* footer */}
      <div className="flex flex-row rounded-2xl w-60 w-[400px] fixed bottom-0 left-0 z-10 p-5">
        <input
          className="mt-5 w-full p-1 text-xl border-2 border-black rounded-xl"
          placeholder="ex. Tulsa | Chicago, IL | Reno, Nevada"
        />
      </div>
      {/* stats */}
      <div className="flex flex-row rounded-2xl w-60 w-[400px] bg-clear-white fixed top-[72px] left-0 z-10 p-5">
        <p className="w-3/4 text-left text-base">
          number of cities named:
          <br />
          combined population:
          <br />% of country population:
        </p>
        <p className="text-blue-700 w-1/4 text-right text-base">
          {ids.length}
          <br />
          {ids
            .map((id) => uscities["population"][`${id}`])
            .reduce((acc, cv) => acc + cv, 0)}
          <br />
          {Math.round(
            (ids.map((id) => uscities["population"][`${id}`]) / totalpop) * 100
          ) / 100}%
        </p>
      </div>
      <MapContainer
        className="fullscreenmap z-0"
        center={position}
        zoom={5}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}

export default App;
