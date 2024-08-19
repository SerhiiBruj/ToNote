/* eslint-disable react/prop-types */

const Circle = (props) => (
  <div
    style={{
      backgroundColor: props.color,
      height: props.size,
      width: props.size,
      borderRadius: "50%",
      position: 'relative',
      top: 0
    }}
  ></div>
);

export default Circle;
