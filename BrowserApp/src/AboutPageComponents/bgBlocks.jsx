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

      <div className="bgblockcontent" style={{ maxWidth: !ff ? 470 : ff }}>
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
  }, [displayedText, text]);

  return (
    <span ref={ref} className="typing-animation">
      {displayedText}
    </span>
  );
};
