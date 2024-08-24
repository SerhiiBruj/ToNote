import { useEffect, useState } from "react";
import AddClocker from "./components/Addclocker";
import Clocker from "./components/Clocker";

let templates = [
  {
    dateOfStart: "14.01.2022",
    name: "Exercising",
    type: "clock on",
    data: [],
    results: "some results",
    goal: "5hr p. d. ",
  },
  {
    dateOfStart: "14.01.2022",

    name: "running time",
    type: "timer",
    data: [],
    results: "some results",
    goal: "1hr",
  },
  {
    dateOfStart: "14.01.2022",

    name: "running sсhquedule",
    type: "check in",
    data: [],
    results: "some results",
    goal: "1hr",
  },
  {
    dateOfStart: "14.01.2022",

    name: "Somethig",
    type: "counter",
    data: [],
    results: "some results",
    goal: "1hr",
  },
];

const Dashboard = () => {
  const [clockers, setClockers] = useState([]);

  useEffect(() => {
    setClockers(templates);
  }, []);

  return (
    <div
      className="dashboard fileConteiner"
      onClick={(e) => e.stopPropagation()}
    >
      {clockers.map((clocker) => (
        <>
          <Clocker
            dateOfStart={clocker.dateOfStart}
            name={clocker.name}
            type={clocker.type}
            data={clocker.data}
            results={clocker.results}
            goal={clocker.goal}
          />
        </>
      ))}
      <div className="heightCont">
        <AddClocker />
      </div>
    </div>
  );
};

export default Dashboard;

// const someTestData = [
//   [
//     null,
//     {
//       dateOfStart: "",
//       name: "Exercising",
//       type: "clock on",
//       data: [],
//       goal: "",
//     },
//     {
//       dateOfStart: "",
//       name: "running time",
//       type: "timer",
//       data: [],
//       goal: "",
//     },
//     {
//       dateOfStart: "",
//       name: "running sсhquedule",
//       type: "check in",
//       data: [],
//       goal: "",
//     },
//     {
//       dateOfStart: "",
//       name: "Somethig",
//       type: "counter",
//       data: [],
//       goal: "",
//     },
//   ],
//   [],
// ];
