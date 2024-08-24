import BellsIcon from "../../../../../assetModules/svgs/bellsIcon";

const Clocker = ({ dateOfStart, name, type, data, results, goal }) => {
  const handleClick = () => {
    if (type === "clock on") {
      console.log("clock on");
    }
    if (type === "timer") {
      console.log("timer");
    }
    if (type === "counter") {
      console.log("counter");
    }
    if (type === "check in") {
      console.log("check in");
    }
  };

  return (
    <div className="clockonConteiner">
      <div className="clockonConteinerInner">
        <div className="fsb">
          <div>
            <span className="name">{name}</span>
            <br />
            <span>Started:{dateOfStart}</span>
          </div>
          <BellsIcon size={1.5} />
        </div>
        <div
          className="schedule
"
        ></div>
      </div>
      <div className="clockonConteinerInner">
        <div className="fcsb">
          <div className="fe">
            <div
              className="clockOn"
              size={200}
              color={"#313131"}
              onClick={handleClick}
            >
              {type === "timer"
                ? "Start"
                : type === "counter"
                ? "Increase"
                : type}
            </div>
          </div>
          <span className="name">Goal:{goal}</span>
          <span className="name">Result:{results}</span>
        </div>
      </div>
    </div>
  );
};

export default Clocker;
