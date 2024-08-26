import { useMemo } from "react";
import AddClocker from "./components/Addclocker";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import ClockOn from "./components/ClockOn";
import CheckIn from "./components/CheckIn";
import Counter from "./components/Counter";
import Timer from "./components/Timer";

// Клас або функціональний компонент `Dashboard`
const Dashboard = () => {
  const location = useLocation();
  const typeName = useMemo(() => {
    return location.pathname.split("/").slice(2).join("/");
  }, [location.pathname]);

  // Виклик хука useLocalStorage всередині компонента
  const [clockers, setClockers] = useLocalStorage(typeName, {
    templates: [],
    table: [],
  });

  return (
    <div
      className="dashboard fileContainer"
      onClick={(e) => e.stopPropagation()}
    >
      {clockers.templates.map((clocker, i) => {
        switch (clocker.type) {
          case "timer":
            return (
              <Timer
                colors={colors}
                clockers={clockers}
                setClockers={setClockers}
                key={i}
                i={i + 1}
              />
            );
          case "counter":
            return (
              <Counter
              colors={colors}
              clockers={clockers}
              setClockers={setClockers}
              key={i}
              i={i + 1}
              />
            );
          case "clock on":
            return (
              <ClockOn
              colors={colors}
              clockers={clockers}
              setClockers={setClockers}
              key={i}
              i={i + 1}
              />
            );
          case "check in":
            return (
              <CheckIn
              clockers={clockers}
              setClockers={setClockers}
              key={i}
              dateOfStart={clocker.dateOfStart}
              name={clocker.name}
              results={clocker.results}
              goal={clocker.goal}
              table={clockers.table}
              typeName={typeName}
              i={i + 1}
              />
            );
          default:
            return null;
        }
      })}
      <div className="heightCont">
        <AddClocker />
     
      </div>
    </div>
  );
};
// location.pathname.split("/")[2] === "dashboard"
export default Dashboard;

let colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#9e9e9e",
  "#607d8b",
];

// import { confirmAlert } from "react-confirm-alert";
// import 'react-confirm-alert/src/react-confirm-alert.css';
// confirmAlert({
//   customUI: ({ onClose }) => {
//     return (
//       <div className="custom-ui"
//       style={{
//         width: 300,
//         height: 200,
//         position: "relative",
//       }}>
//         <h1>Are you sure?</h1>
//         <p>You want to delete this file?</p>
//         <button onClick={onClose}>No</button>
//         <button
//           onClick={() => {
//             console.log(this);
//             onClose();
//           }}
//         >
//           Yes, Delete it!
//         </button>
//       </div>
//     );
//   },
// });




// {
//   templates: [
//     {
//       dateOfStart: "14.01.2022",
//       name: "Exercising",
//       type: "clock on",
//       results: "some results",
//       goal: "5hr p. d.",
//     },
//     {
//       dateOfStart: "14.01.2022",
//       name: "running time",
//       type: "timer",
//       results: "some results",
//       goal: "1hr",
//     },
//     {
//       dateOfStart: "14.01.2022",
//       name: "running schedule",
//       type: "check in",
//       results: "some results",
//       goal: "1hr",
//     },
//     {
//       dateOfStart: "14.01.2022",
//       name: "Something",
//       type: "counter",
//       results: "some results",
//       goal: "1hr",
//     },
//   ],
//   table: [
//     [
//       "date",
//       "Exercising",
//       "running time",
//       "running schedule",
//       "Something",
//     ],
//     ["11.08.2022", 0, [0, 5], true, 0],
//     ["12.09.2022", 8, [0, 5], true, 0],
//     ["13.09.2022", 5, [0, 5], true, 2],
//     ["14.09.2022", 2, [0, 5], true, 0],
//     ["15.09.2022", 4, [0, 5], true, 0],
//     ["16.09.2022", 8, [0, 5], true, 2],
//     ["17.09.2022", 4, [0, 5], true, 0],
//     ["18.09.2022", 2, [0, 5], false, 0],
//     ["19.09.2022", 2, [0, 5], false, 3],
//     ["20.09.2022", 4, [0, 4], false, 5],
//     ["21.09.2022", 8, [0, 1], false, 2],
//     ["22.09.2022", 4, [5, 1], true, 1],
//     ["23.09.2022", 2, [5, 5], true, 10],
//     ["24.09.2022", 2, [0, 5], false, 0],
//     ["25.09.2022", 2, [0, 5], false, 3],
//     ["26.09.2022", 0, [0, 4], false, 5],
//     ["27.09.2022", 8, [0, 1], false, 2],
//     ["28.09.2022", 4, [5, 1], true, 1],
//     ["29.09.2022", 2, [5, 5], true, 10],
//     ["30.09.2022", 8, [0, 1], false, 0],
//     ["31.09.2022", 4, [5, 1], true, 1],
//     ["1.10.2022", 0, [5, 5, 41], true, 10],
//   ],
// }
