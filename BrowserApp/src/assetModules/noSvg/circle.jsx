/* eslint-disable react/prop-types */

const Circle = (props) => (
  <div
    className="circle"
    style={{
      backgroundColor: props.color,
     
      borderRadius: "50%",
      position: 'relative',
      top: 0
    }}
  ></div>
);

export default Circle;
