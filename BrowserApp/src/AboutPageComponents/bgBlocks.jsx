import { useEffect, useRef, useState } from "react";

function* pRV() {
  while (true) {
    yield Math.floor(
      (Math.random() * 100 + 100) * (Math.random() < 0.4 ? -1 : 1)
    );
  }
}

// eslint-disable-next-line react/prop-types
const BgBlocks = ({ children, num, text, ff, delay = 100 }) => {
  const blockRefs = useRef([]);

  useEffect(() => {
    blockRefs.current.forEach((block) => {
      const tb = [pRV().next().value, pRV().next().value];
      block?.animate(
        [
          {
            transform: `translate(${tb[0]}px, ${tb[1]}px)`,
          },
          {
            transform: `translate(${pRV().next().value}px, ${
              pRV().next().value
            }px)`,
          },
          {
            transform: `translate(${pRV().next().value}px, ${
              pRV().next().value
            }px)`,
          },
          {
            transform: `translate(${tb[0]}px, ${tb[1]}px)`,
          },
        ],
        {
          duration: 50000,
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
    });
  }, []);
  return (
    <div className="container-of-blocks" style={{ position: "relative" }}>
      {Array.from({ length: num }).map((_, i) => (
        <div
          ref={(el) => (blockRefs.current[i] = el)}
          key={i}
          className="bgtransblock"
          style={{
            backgroundColor: "#858585",
            height: Math.floor(Math.random() * (400 - 200 + 1)) + 200,
            width: Math.floor(Math.random() * (400 - 200 + 1)) + 200,
            borderRadius: 20,
            opacity: 0.3,
            zIndex: 0,

            position: "absolute",
            transform: `translateX(${
              (Math.random() * 100 + 50) * (Math.random() < 0.5 ? -1 : 1)
            }px) translateY(${
              (Math.random() * 100 + 50) * (Math.random() < 0.5 ? -1 : 1)
            }px)`,
          }}
        ></div>
      ))}

      <div
        className="bgblockcontent"
        style={{
          height: "auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent:'space-around',
          alignItems:'center',
          maxWidth: !ff ? 470 : ff,
          borderRadius: 20,
          zIndex: 5,
          paddingBottom:30,

        }}
      >
        {!!text && <TypingAnimation delay={delay} text={text} />}
        {children}
      </div>
    </div>
  );
};

export default BgBlocks;

// eslint-disable-next-line react/prop-types
const TypingAnimation = ({ delay, text, h = 10, w = 21 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef(null);
  const renderText = (i, l) => {
    if (i < l) {
      setTimeout(() => {
        setDisplayedText((prev) => prev + text[i]);
        renderText(i + 1, l);
      }, 50);
    } else {
      return 0;
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && displayedText === "") {
          setTimeout(() => {
            // eslint-disable-next-line react/prop-types
            renderText(0, text.length);
          }, delay);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [displayedText]);

  return (
    <span
      ref={ref}
      style={{
        color: "#1e1e1e",
        fontSize: 25,
        padding: "50px 50px 0px 50px",
        textAlign: "left",
        whiteSpace: "pre-wrap",
        minWidth: `${w}vw`,
        minHeight: `${h}vh`,
      }}
    >
      {displayedText}
    </span>
  );
};
