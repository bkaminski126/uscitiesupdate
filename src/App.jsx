import { Circle, MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
  const [inputVal, setInputVal] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* helpers */

  function checkNew() {
    //FIND CITY ID
    let split = inputVal.split(",").map((s) => s.trim().toLowerCase());
    let lowercities = citynames.map((x) => x.toLowerCase());
    let cityId = -1;

    //check for manual entry
    if (split.length == 2 && abbrnames.includes(split[1].toUpperCase())) {
      //check for manual state entry
      //filter by state abbr
      let isInState = abbrs.map((s) => s == split[1].toUpperCase());
      for (let index = 0; index < isInState.length; index++) {
        if (isInState[index] && lowercities[index] == split[0].trim()) {
          cityId = index;
          break;
        }
      }
    } else if (split.length == 2) {
      //filter by state
      let isInState = states.map((s) => s.toLowerCase() == split[1]);
      for (let index = 0; index < isInState.length; index++) {
        if (isInState[index] && lowercities[index] == split[0]) {
          cityId = index;
          break;
        }
      }
    } else if (split.length == 1) {
      //finds largest city across all states
      cityId = lowercities.findIndex((x) => x == split[0]);
    }
    //if found, add to state
    if (ids.includes(cityId)) {
      //let them know already found
    } else if (cityId > 0) {
      setIds((i) => [...i, cityId]);
      setInputVal("");
    }
  }

  return (
    <>
      {/* header */}
      <div className="flex flex-row rounded-2xl w-full bg-clear-white fixed top-0 left-0 z-10 p-5">
        <p className="font-bold w-full text-2xl">
          How many U.S. cities can you name?
        </p>
        <img
          onClick={() => setIsMenuOpen((m) => !m)}
          src={"./hamburger.png"}
          className={"h-[28px]"}
        />
      </div>
      {/* footer */}
      <div className="flex flex-row rounded-2xl w-60 w-[400px] fixed bottom-0 left-0 z-10 p-5">
        <input
          value={inputVal}
          onKeyDown={function (e) {
            if (e.key === "Enter") {
              checkNew();
            }
          }}
          onChange={(e) => setInputVal(e.target.value)}
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
            (ids.map((id) => uscities["population"][`${id}`]) / totalpop) *
              10000
          ) / 100}
          %
        </p>
      </div>
      {/* menu open */}
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
        {ids.map((id) => (
          <Circle
            radius={Math.round(
              uscities.population[`${id}`] / 300 +
                Math.log10(uscities.population[`${id}`] / 100) * 5000
            )}
            color="#ff0000"
            opacity={1}
            weight={1}
            key={id + "marker"}
            center={[uscities.lat[`${id}`], uscities.lng[`${id}`]]}
          >
            <Popup>
              {uscities.city_ascii[`${id}`]}, {uscities.state_name[`${id}`]}
              <br />
              {uscities.population[`${id}`]} (rank {id + 1})
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </>
  );
}

export default App;
