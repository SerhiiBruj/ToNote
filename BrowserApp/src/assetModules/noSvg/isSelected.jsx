/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deSelect, select as selectAction } from "../../redux/selectSlice"; // Переконайтесь, що ви імплементуєте selectAction правильно

const IsSelected = ({ typename }) => {
  const [isSelected, setIsSelected] = useState(false);
  const { isSelecting, selected } = useSelector((state) => state.select);
  
  const dispatch = useDispatch();

  useEffect(() => {
   
    setIsSelected(selected.includes(typename));
  }, [selected, typename]); 

  const handleSelect = (e) => {
    e.stopPropagation(); 

    if (!selected.includes(typename)) {
      dispatch(selectAction(typename)); 
    }
    else{
        dispatch(deSelect(typename)); 
    }
  };

  return (
    <div style={{ display: isSelecting ? "flex" : "none" }}>
      <div
        className="selectCircle"
        onClick={handleSelect} // Використовуйте handleSelect замість select
        style={{
          background: isSelected ? "rgb(46 46 46 )" : "none",
        }}
      ></div>
    </div>
  );
};

export default IsSelected;
