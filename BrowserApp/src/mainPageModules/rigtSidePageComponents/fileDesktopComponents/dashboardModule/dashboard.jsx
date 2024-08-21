import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import AddClocker from "./components/Addclocker";

const Dashboard = () => {
  const someData = [
    {
      dateOfStart: "",
      type: "clock on",
      data: [],
      goal: "",
    },
    {
      dateOfStart: "",
      type: "timer",
      data: [],
      goal: "",
    },
    {
      dateOfStart: "",
      type: "check in",
      data: [],
      goal: "",
    },
    {
      dateOfStart: "",
      type: "counter",
      data: [],
      goal: "",
    },
  ];

  return (
    <div className="dashboard" onClick={(e) => e.stopPropagation()}>
      <div className="clockonConteiner">
        <div className="clockonConteinerInner">
          <div className="fsb">
            <span className="name">Running</span> <BellsIcon size={1.5} />
          </div>
          <div
            className="schedule
"
          ></div>
        </div>
        <div className="clockonConteinerInner">
          <div className="fcsb">
            <div className="fe">
              <div className="clockOn" size={200} color={"#313131"}>
                Clock On
              </div>
            </div>
            <span className="name">Goal:</span>
            <span className="name">Result:</span>
          </div>
        </div>
      </div>
      <AddClocker />
    </div>
  );
};

export default Dashboard;
