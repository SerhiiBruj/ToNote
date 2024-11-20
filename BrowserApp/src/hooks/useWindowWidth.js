import { useState, useEffect,  } from "react";

const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const [time, setTime] = useState(null)
    const resize = () => {
        clearTimeout(time);
        let t = setTimeout(() => {
            console.log("resize")
            setWidth(window.innerWidth)
        }, 1000);
        setTime(t)
    }
    useEffect(() => {
        window.addEventListener("resize", resize)
        return () => window.removeEventListener("resize", resize);
    }, [])

    return width
};

export default useWindowWidth;
