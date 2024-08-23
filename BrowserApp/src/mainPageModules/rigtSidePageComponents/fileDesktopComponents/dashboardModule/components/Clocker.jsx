import BellsIcon from '../../../../../assetModules/svgs/bellsIcon'

const Clocker = () => {

  return (
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
                Clock On <br/>
                </div>
            </div>
            <span className="name">Goal:</span>
            <span className="name">Result:</span>
          </div>
        </div>
      </div>
  )
}

export default Clocker
