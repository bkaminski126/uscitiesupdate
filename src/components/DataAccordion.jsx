import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import uscities from "../data/uscities";
import { useState } from "react";

export default function DataAccordion(props) {
  const { ids, setPosition } = props;
  const c = uscities;
  const [open, setOpen] = useState(0);

  //capitals for star
  const caps = [
    171, 1416, 10, 90, 24, 17, 50, 353, 53, 170, 7, 102, 272, 32, 82, 302, 1599,
    73, 2356, 1167, 9, 130, 138, 120, 1072, 1388, 152, 875, 1057, 144, 481, 42,
    514, 76, 34, 48, 160, 88, 38, 72, 3033, 41, 30, 40, 5039, 44, 222, 315, 91,
    620,
  ];

  /* sorted ids */
  let smalls = ids
    .slice()
    .sort((a, b) => c["population"][`${a}`] - c["population"][`${b}`]);
  let bigs = smalls.slice().reverse().slice(0, 20);
  smalls = smalls.slice(0, 20);

  /* helpers */
  function overPop(p, arr) {
    return arr.filter((k) => c["population"][`${k}`] > p);
  }

  /* other stats */
  let pops = [1000000, 500000, 100000];

  return (
    <div
      className="md:w-1/3 md:rounded-2xl md:bg-semiclear-white fixed top-[72px] right-0 z-10 p-5
    bg-white rounded-0 w-full h-full md:h-auto z-50"
    >
      <div
        className={`cursor-grab flex flex-row justify-between items-center " ${
          open == 4 && "pb-5"
        }`}
        onClick={() => setOpen(open == 4 ? 0 : 4)}
      >
        <p className={"font-bold text-xl text-slate-800"}>My Cities</p>
        {open == 4 ? (
          <FontAwesomeIcon className={"h-[20px]"} icon={faAngleUp} />
        ) : (
          <FontAwesomeIcon className={"h-[20px]"} icon={faAngleDown} />
        )}
      </div>
      <div>
        {open == 4 && (
          <div className="overflow-y-scroll h-[30vh] md:h-72">
            {ids.length == 0 ? (
              <p className={"text-slate-600 text-md"}>
                No cities yet... type below to grow your list!
              </p>
            ) : (
              ids
                .slice()
                .reverse()
                .map((b, i) => (
                  <div
                    key={"cities" + b}
                    onClick={() => setPosition([c["lat"][b], c["lng"][b]])}
                  >
                    <p className={"text-lg text-slate-900"}>
                      {ids.length - i}. {c["city_ascii"][b]}{" "}
                      {caps.includes(b) && (
                        <FontAwesomeIcon className={"h-[16px]"} icon={faStar} />
                      )}
                    </p>
                    <p
                      className={`text-md text-slate-500 ${
                        ids.length - i >= 10 ? "pl-[30px]" : "pl-[20px]"
                      }`}
                    >
                      {c["state_name"][b]} (
                      {c["population"][b].toLocaleString()})
                    </p>
                  </div>
                ))
            )}
          </div>
        )}
      </div>
      <div
        className={`pt-5 cursor-grab flex flex-row justify-between items-center " ${
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
                <div
                  key={"bigs" + b}
                  onClick={() => setPosition([c["lat"][b], c["lng"][b]])}
                >
                  <p className={"text-lg text-slate-900"}>
                    {i + 1}. {c["city_ascii"][b]}{" "}
                    {caps.includes(b) && (
                      <FontAwesomeIcon className={"h-[16px]"} icon={faStar} />
                    )}
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
                    {i + 1}. {c["city_ascii"][b]}{" "}
                    {caps.includes(b) && (
                      <FontAwesomeIcon className={"h-[16px]"} icon={faStar} />
                    )}
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
            <p className='text-xl italic font-semibold'>You've named...</p>
            <p>{ids.filter((v) => v < 100).length} out of the 100 largest cities</p>
            <p>
              {caps.filter((value) => ids.includes(value)).length} of{" "}
              {caps.length} capitals {ids.includes(8) && " + Washington, DC"}
            </p>
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
