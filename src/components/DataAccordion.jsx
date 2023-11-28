import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import uscities from "../data/uscities";
import { useState } from "react";

export default function DataAccordion(props) {
  const { ids, setPosition } = props;
  const c = uscities;
  const [open, setOpen] = useState(0);

  /* sorted ids */
  let smalls = ids.sort(
    (a, b) => c["population"][`${a}`] - c["population"][`${b}`]
  );
  let bigs = smalls.slice().reverse().slice(0, 20);
  smalls = smalls.slice(0, 20);

  /* helpers */
  function overPop(p, arr) {
    return arr.filter((k) => c["population"][`${k}`] > p);
  }

  /* other stats */
  let pops = [1000000, 500000, 100000];

  return (
    <div className="w-1/3 rounded-2xl bg-semiclear-white fixed top-[72px] right-0 z-10 p-5">
      <div
        className={`cursor-grab flex flex-row justify-between items-center " ${
          open == 1 && "pb-5"
        }`}
        onClick={() => setOpen(open == 1 ? 0 : 1)}
      >
        <p className={"font-bold text-xl text-slate-800"}>Largest Cities</p>
        {open == 1 ? (
          <FontAwesomeIcon className={"h-[20px]"} icon={faAngleUp} />
        ) : (
          <FontAwesomeIcon className={"h-[20px]"} icon={faAngleDown} />
        )}
      </div>
      <div>
        {open == 1 && (
          <div className="overflow-y-scroll h-72">
            {ids.length == 0 ? (
              <p className={"text-slate-600 text-md"}>
                No cities yet... type below to grow your list!
              </p>
            ) : (
              bigs.map((b, i) => (
                <div key={"bigs" + b} onClick={() => setPosition([c['lat'][b], c['lng'][b]])}>
                  <p className={"text-lg text-slate-900"}>
                    {i + 1}. {c["city_ascii"][b]}
                  </p>
                  <p
                    className={`text-md text-slate-500 ${
                      i >= 9 ? "pl-[30px]" : "pl-[20px]"
                    }`}
                  >
                    {c["state_name"][b]} ({c["population"][b].toLocaleString()})
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div
        className={`pt-5 cursor-grab flex flex-row justify-between items-center" ${
          open == 2 && "pb-5"
        }`}
        onClick={() => setOpen(open == 2 ? 0 : 2)}
      >
        <p className={"font-bold text-xl text-slate-800"}>Smallest Cities</p>
        {open == 2 ? (
          <FontAwesomeIcon className={"h-[20px]"} icon={faAngleUp} />
        ) : (
          <FontAwesomeIcon className={"h-[20px]"} icon={faAngleDown} />
        )}
      </div>
      <div>
        {open == 2 && (
          <div className="overflow-y-scroll h-72">
            {ids.length == 0 ? (
              <p className={"text-slate-600 text-md"}>
                No cities yet... type below to grow your list!
              </p>
            ) : (
              smalls.map((b, i) => (
                <div key={"smalls" + b}>
                  <p className={"text-lg text-slate-900"}>
                    {i + 1}. {c["city_ascii"][b]}
                  </p>
                  <p
                    className={`text-md text-slate-500 ${
                      i >= 9 ? "pl-[30px]" : "pl-[20px]"
                    }`}
                  >
                    {c["state_name"][b]} ({c["population"][b].toLocaleString()})
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div
        className={`pt-5 cursor-grab flex flex-row justify-between items-center" ${
          open == 3 && "pb-5"
        }`}
        onClick={() => setOpen(open == 3 ? 0 : 3)}
      >
        <p className={"font-bold text-xl text-slate-800"}>Other Stats</p>
        {open == 3 ? (
          <FontAwesomeIcon className={"h-[20px]"} icon={faAngleUp} />
        ) : (
          <FontAwesomeIcon className={"h-[20px]"} icon={faAngleDown} />
        )}
      </div>
      <div>
        {open == 3 && (
          <div>
            {pops.map((p) => (
              <p key={"pop" + p}>
                {overPop(p, ids).length} out of{" "}
                {overPop(p, Object.keys(c.city_ascii)).length} cities over{" "}
                {p.toLocaleString()}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
