import { useState } from "react";
import "./index.css";
import uscities from "./data/uscities";
import DataAccordion from "./components/DataAccordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Map from "./components/Map";
import { useCookies } from "react-cookie";

function App() {
  //INIT CONSTANTS
  const c = uscities;

  // const clen = Object.keys(c.city_ascii).length; //30k atm
  const citynames = Array.from(Object.values(c.city_ascii));

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const states = Array.from(Object.values(c.state_name));
  // const statenames = states.filter(onlyUnique).sort();

  const abbrs = Array.from(Object.values(c.state_id));
  const abbrnames = abbrs.filter(onlyUnique).sort();

  const totalpop = 331449281; //2020 census

  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [ids, setIds] = useState(
    cookies.ids ? (cookies.ids.toString().includes(',') ? cookies.ids.split(",").map((x) => parseInt(x)) : [parseInt(cookies.ids)]) : []
  );
  const [inputVal, setInputVal] = useState("");
  const [errEffect, setErrEffect] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [position, setPosition] = useState([37, -96]);

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
    } else if (cityId >= 0) {
      setCookie("ids", [...ids, cityId].join(","), { path: "/" });
      setIds((i) => [...i, cityId]);
      setInputVal("");
      return cityId;
    }
    return -1;
  }

  return (
    <div className="font-nunito">
      {/* header */}
      <div className="flex flex-row md:rounded-2xl w-full bg-white rounded-0 md:bg-clear-white fixed top-0 left-0 z-10 p-5">
        <p className="font-bold w-full text-lg md:text-2xl">
          How many U.S. cities can you name?
        </p>
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => setAccordionOpen((o) => o == 0)}
          className="cursor-pointer h-[18px] md:h-[28px] z-100"
        />
      </div>
      {/* clear/save button */}
      <button
        onClick={() => {
          setIds([]);
          setCookie("ids", "");
        }}
        className="text-white text-xl bg-red-700 w-[100px] p-2 hover:bg-red-500 rounded-xl fixed left-[20px] top-[200px] z-20"
      >
        Clear
      </button>
      <button
        onClick={() => {}}
        className="text-white text-xl bg-blue-700 w-[100px] p-2 hover:bg-blue-500 rounded-xl fixed left-[140px] top-[200px] z-20"
      >
        Save
      </button>

      {/* footer */}
      <div className="rounded-2xl w-60 md:w-[500px] w-[80%] fixed bottom-0 left-0 z-10 p-5">
        <input
          value={inputVal}
          onKeyDown={function (e) {
            if (e.key === "Enter") {
              let c = checkNew();
              if (c < 0) {
                setErrEffect(true);
              }
            }
          }}
          onAnimationEnd={() => setErrEffect(false)}
          onChange={(e) => setInputVal(e.target.value)}
          className={
            (errEffect && "animate-horizshake") +
            " mt-5 w-full p-1 text-xl border-[3px] rounded-xl " +
            (errEffect
              ? "border-red-500 focus:border-red-500"
              : "focus:border-blue-600 border-slate-900")
          }
          placeholder="ex. Tulsa / Chicago, IL / Ames, Iowa"
        />
      </div>
      {/* stats */}
      <div className="font-bold flex flex-row rounded-2xl w-60 w-[350px] bg-clear-white fixed top-[72px] left-0 z-10 p-5">
        <p className="text-left text-base">
          number of cities named:
          <br />
          combined population:
          <br />% of country population:
        </p>
        <p className="text-blue-700 text-right text-base">
          {ids.length.toLocaleString()}
          <br />
          {ids
            .map((id) => c["population"][`${id}`])
            .reduce((acc, cv) => acc + cv, 0)
            .toLocaleString()}
          <br />
          {(
            Math.round(
              (ids
                .map((id) => c["population"][`${id}`])
                .reduce((acc, cv) => acc + cv, 0) /
                totalpop) *
                10000
            ) / 100
          ).toLocaleString()}
          %
        </p>
      </div>

      {accordionOpen && (
        <DataAccordion
          className={"animate-fadeIn"}
          ids={ids}
          setPosition={setPosition}
        />
      )}

      <Map ids={ids} position={position} />
    </div>
  );
}

export default App;
