import { useEffect, useState } from "react";
import AddClocker from "./components/Addclocker";
import Clocker from "./components/Clocker";

const data = {
  templates: [
    {
      dateOfStart: "14.01.2022",
      name: "Exercising",
      type: "clock on",
      results: "some results",
      goal: "5hr p. d.",
    },
    {
      dateOfStart: "14.01.2022",
      name: "running time",
      type: "timer",
      results: "some results",
      goal: "1hr",
    },
    {
      dateOfStart: "14.01.2022",
      name: "running schedule",
      type: "check in",
      results: "some results",
      goal: "1hr",
    },
    {
      dateOfStart: "14.01.2022",
      name: "Something",
      type: "counter",
      results: "some results",
      goal: "1hr",
    },
  ],
  table: [
    ["date", "Exercising", "running time", "running schedule", "Something"],
    ["11.08.2022", 0, [0, 5], true, 0],
    ["12.09.2022", 8, [0, 5], true, 0],
    ["13.09.2022", 5, [0, 5], true, 2],
    ["14.09.2022", 2, [0, 5], true, 0],
    ["15.09.2022", 4, [0, 5], true, 0],
    ["16.09.2022", 8, [0, 5], true, 2],
    ["17.09.2022", 4, [0, 5], true, 0],
    ["18.09.2022", 2, [0, 5], false, 0],
    ["19.09.2022", 2, [0, 5], false, 3],
    ["20.09.2022", 4, [0, 4], false, 5],
    ["21.09.2022", 8, [0, 1], false, 2],
    ["22.09.2022", 4, [5, 1], true, 1],
    ["23.09.2022", 2, [5, 5], true, 10],
    ["24.09.2022", 2, [0, 5], false, 0],
    ["25.09.2022", 2, [0, 5], false, 3],
    ["26.09.2022", 0, [0, 4], false, 5],
    ["27.09.2022", 8, [0, 1], false, 2],
    ["28.09.2022", 4, [5, 1], true, 1],
    ["29.09.2022", 2, [5, 5], true, 10],
    ["30.09.2022", 8, [0, 1], false, 0],
    ["31.09.2022", 4, [5, 1], true, 1],
    ["1.10.2022", 0, [5, 5,41], true, 10],
  ],
};

const Dashboard = () => {
  const [clockers, setClockers] = useState([]);

  useEffect(() => {
    setClockers(data.templates);
  }, []);

  return (
    <div
      className="dashboard fileContainer"
      onClick={(e) => e.stopPropagation()}
    >
      {clockers.map((clocker, i) => (
        <Clocker
          key={i}
          dateOfStart={clocker.dateOfStart}
          name={clocker.name}
          type={clocker.type}
          results={clocker.results}
          goal={clocker.goal}
          table={data.table}
          i={i + 1}
        />
      ))}
      <div className="heightCont">
        <AddClocker />
      </div>
    </div>
  );
};

export default Dashboard;
