/* eslint-disable react/prop-types */

const CrissCrossIcon = (props) => {
  return (
    <svg
    height={window.innerWidth > 500 ? `${91 * props.size}vw` : "40vw"}
    width={window.innerWidth > 500 ? `${91 * props.size}vw` : "40vw"}

      viewBox="0 0 100 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transition: "all ease 0.3s",
        transform:window.innerWidth < 500&& "translate(-20vw,-10vw)"
       }}
    >
      <rect
        x="43.9021"
        y="-0.000183105"
        width="12.1951"
        height="91"
        rx="6.09756"
        fill={props.color}
        style={{ transition: "all ease 0.3s" }}
      />
      <rect
        y="51.0488"
        width="11.0976"
        height="100"
        rx="5.54878"
        transform="rotate(-90 0 51.0488)"
        style={{ transition: "all ease 0.3s" }}
        fill={props.color}
      />
    </svg>
  );
};

export default CrissCrossIcon;
