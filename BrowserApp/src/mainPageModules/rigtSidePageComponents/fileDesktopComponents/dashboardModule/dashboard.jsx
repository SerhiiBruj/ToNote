import BellsIcon from "../../../../assetModules/svgs/bellsIcon";

const Dashboard = () => {
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
            <span className="name">Running</span>
            <span className="name">Running</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
