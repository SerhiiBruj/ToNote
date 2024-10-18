// eslint-disable-next-line react/prop-types
const CheckBox = ({size, checked }) => {
    return (
      <div className="selcirc" style={{
        height:`${size}px !important `,
        width:`${size}px !important `,
      }}>
        <div
          className="selectCircle"
          style={{

            background: checked ? "rgb(46 46 46 )" : "none",
          }}
        ></div>
      </div>
    );
  };
  
  export default CheckBox;
  