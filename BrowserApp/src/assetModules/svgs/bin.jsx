/* eslint-disable react/prop-types */

const BinIcon = (props) => {
  return (
    <svg
      width={props.size * 52}
      height={props.size * 56}
      viewBox="0 0 83 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.91663 10.4H76.0833L68.2234 104H13.2045L6.91663 10.4Z"
        fill={props.color}
      />
      <path
        d="M6.69355 3.46667H77.6452L83 10.4H0L6.69355 3.46667Z"
        fill={props.color}
      />
      <rect x="34.5834" width="13.8333" height="6.93333" fill={props.color} />
    </svg>
  );
};

export default BinIcon;
