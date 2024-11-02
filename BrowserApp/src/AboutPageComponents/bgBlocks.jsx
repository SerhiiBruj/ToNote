/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

function pRV() {
  return Math.floor(
    (Math.random() * 250) * (Math.random() < 0.4 ? -1 : 1)
  );
}

// eslint-disable-next-line react/prop-types
const BgBlocks = ({ children, num, text, ff, delay = 100 }) => {
  const blockRefs = useRef([]);
  useEffect(() => {
    console.log("BgBlocks was updated");
  }, []);
  useEffect(() => {
    blockRefs.current.forEach((block) => {
      const tb = [pRV(), pRV()];
      block.animate(
        [
          {
            transform: `translate(${tb[0]}px, ${tb[1]}px)`,
          },
          {
            transform: `translate(${pRV()}px, ${
              pRV()
            }px)`,
          },
          {
            transform: `translate(${pRV()}px, ${
              pRV()
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
    <div className="container-of-blocks">
      {Array.from({ length: num }).map((_, i) => {
        const randomX =
          (Math.random() * 100 + 50) * (Math.random() < 0.5 ? -1 : 1);
        const randomY =
          (Math.random() * 100 + 50) * (Math.random() < 0.5 ? -1 : 1);
        return (
          <div
            ref={(el) => (blockRefs.current[i] = el)}
            key={i}
            className="bgtransblock"
            style={{
              transform: `translateX(${randomX}px) translateY(${randomY}px)`,
            }}
          ></div>
        );
      })}

      <div
        className="bgblockcontent"
        style={{ maxWidth: !ff ? 470 : ff, textAlign: "flex-start" }}
      >
        <span
          style={{
            height: 0,
            opacity: 0,
            minHeight: "0px",
            paddingBottom: 0,
            paddingTop: 0,
          }}
          className="typing-animation"
        >
          {text}
        </span>
        {!!text && <TypingAnimation delay={delay} text={text} />}
        {children}
      </div>
    </div>
  );
};

export default BgBlocks;

// eslint-disable-next-line react/prop-types
const TypingAnimation = ({ delay, text }) => {
  const ref = useRef(null);

  useEffect(() => {
    let i = 0;
    let intervalId;

    const renderText = () => {
      intervalId = setInterval(() => {
        if (i < text.length && ref.current) {
          console.log("object");
          ref.current.insertAdjacentText("beforeend", text[i]);
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, 50);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !intervalId) {
          setTimeout(() => {
            renderText();
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [text, delay]);

  return (
    <span
      ref={ref}
      className="typing-animation"
      style={{ textAlign: "left" }}
    ></span>
  );
};
