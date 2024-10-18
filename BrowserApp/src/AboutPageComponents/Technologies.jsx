import BgBlocks from "./bgBlocks";
import Node from "../assetModules/svgs/node";
import Express from "../assetModules/svgs/express";
import Sqllite from "../assetModules/svgs/sqllite";
import Vite from "../assetModules/svgs/vite";
import ReactIc from "../assetModules/svgs/react";
import Redux from "../assetModules/svgs/reduxIcon";
import Sass from "../assetModules/svgs/sass";

const Technologies = () => {
  return (
    <section
      id="Technologies"
      style={{
        paddingTop: 120,
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <BgBlocks num={3} delay={1000} text={"Dive Deeper\nGet to know how these technologies come together to make ToNote your go-to productivity app."}>
    
      </BgBlocks>
      <BgBlocks
        num={5}
        delay={1200}
        text={"ToNote is crafted using cutting-edge technologies to ensure a smooth and responsive experience."}
      >
        <ListOfTechs />
      </BgBlocks>
      <BgBlocks
        delay={1700}
        num={8}
        text={`Desktop and mobile apps are being developed using React native`}
      />
    </section>
  );
};

export default Technologies;

const ListOfTechs = () => {
  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <ul style={{ width: "40%", paddingLeft: 10 }}>
        <caption
          style={{
            color: "#1e1e1e",
            fontSize: 28,

            textAlign: "left",
            textWrap: "nowrap",
          }}
        >
          Front-end
        </caption>
        <li
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "#1e1e1e",
              fontSize: 25,
              paddingTop: 10,
              textAlign: "left",
              textWrap: "pretty",
            }}
          >
            React
          </span>
          <ReactIc />
        </li>
        <li
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "#1e1e1e",
              fontSize: 25,
              paddingTop: 10,

              textAlign: "left",
              textWrap: "pretty",
            }}
          >
            Vite
          </span>
          <Vite />
        </li>
        <li
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "#1e1e1e",
              fontSize: 25,
              paddingTop: 10,

              textAlign: "left",
              textWrap: "pretty",
            }}
          >
            Redux
          </span>
          <Redux />
        </li>
        <li
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "#1e1e1e",
              fontSize: 25,
              paddingTop: 10,

              textAlign: "left",
              textWrap: "pretty",
            }}
          >
            Sass
          </span>
          <Sass />
        </li>
      </ul>
      <ul style={{ width: "40%", paddingLeft: 10 }}>
        <caption
          style={{
            color: "#1e1e1e",
            fontSize: 28,

            textAlign: "left",
            textWrap: "nowrap",
          }}
        >
          Back-end
        </caption>
        <li
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "#1e1e1e",
              fontSize: 25,
              paddingTop: 10,
              textAlign: "left",
              textWrap: "pretty",
            }}
          >
            SQLite
          </span>{" "}
          <Sqllite />
        </li>
        <li
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "#1e1e1e",
              fontSize: 25,
              paddingTop: 10,
              textAlign: "left",
              textWrap: "pretty",
            }}
          >
            Express
          </span>

          <Express />
        </li>
        <li
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "#1e1e1e",
              fontSize: 25,
              paddingTop: 10,
              textAlign: "left",
              textWrap: "pretty",
            }}
          >
            Node js
          </span>

          <Node />
        </li>
      </ul>
    </div>
  );
};
