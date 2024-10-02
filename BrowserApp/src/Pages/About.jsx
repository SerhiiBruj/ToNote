import { Link, NavLink } from "react-router-dom";
import BgBlocks from "../AboutPageComponents/bgBlocks";
import Comp from "../assetModules/svgs/comp";

const About = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "scroll",
        height: "100vh",
      }}
    >
      <div
        style={{
          zIndex: 6,
          background: "gray",
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 50px 0px 20px",
          position: "fixed",

          width: "100%",
          top: 0,
          paddingRight: 50,
        }}
      >
        <div style={{ paddingLeft: "50px" }}>
          <a
            href="https://github.com/SerhiiBruj/ToNote"
            style={{
              color: "#1e1e1e",
              fontSize: 35,
              display: "inline-block",
              width: 150,
            }}
          >
            ToNote
          </a>
          <NavLink
            to={"WhatIsIt"}
            style={{
              color: "#1e1e1e",
              fontSize: 22,
              textDecoration: "none",
              paddingLeft: 30,
            }}
          >
            What is it
          </NavLink>
          <NavLink
            to={"Technologies"}
            style={{
              color: "#1e1e1e",
              fontSize: 22,
              textDecoration: "none",
              paddingLeft: 30,
            }}
          >
            Technologies
          </NavLink>
          <NavLink
            to={"Creator"}
            style={{
              color: "#1e1e1e",
              fontSize: 22,
              textDecoration: "none",
              paddingLeft: 30,
            }}
          >
            Creator
          </NavLink>
        </div>
        <div style={{ display: "flex", marginRight: 50 }}>
          <Link
            to={"/authentification"}
            style={{
              color: "gray",
              overflow: "hidden",
              backgroundColor: "#1e1e1e",
              borderRadius: 10,
              textDecoration: "none",
              padding: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "30px",
              width: 180,
              fontSize: 25,
            }}
          >
            Log In
            <span
              style={{
                background: "gray",
                width: "8px",
                height: "100px",
                transform: "rotate(25deg)",
                display: "inline-block",
              }}
            ></span>
            Register
          </Link>
        </div>
      </div>

      <div
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: 120,
        }}
      >
        <BgBlocks num={3} text={
          "ToNote is a productivity app designed to help users stay organized and efficient. It offers tools for managing notes, diaries, tables, checklists, and to-do lists, making it easier to track progress and stay on top of tasks."
        } >
        </BgBlocks>
        <BgBlocks
          num={2}
          text={
            "Desktop, and mobile versions are comming soon"
          }
          
        >
          <Comp/>

        </BgBlocks>
      </div>

      <div
        style={{
          marginTop: 120,
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <BgBlocks
          num={5}
          text={
            "ToNote is a productivity app designed to help users stay organized and efficient. It offers tools for managing notes, diaries, tables, checklists, and to-do lists, making it easier to track progress and stay on top of tasks."
          }
        />
        <BgBlocks
          num={1}
          text={
            "ToNote is a productivity app designed to help users stay organized and efficient. It offers tools for managing notes, diaries, tables, checklists, and to-do lists, making it easier to track progress and stay on top of tasks."
          }
        />
      </div>
      <div
        style={{
          marginTop: 120,
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <BgBlocks
          num={3}
          text={
            "ToNote is a productivity app designed to help users stay organized and efficient. It offers tools for managing notes, diaries, tables, checklists, and to-do lists, making it easier to track progress and stay on top of tasks."
          }
        />
      </div>
    </div>
  );
};

export default About;



let str =" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam fugit ea minus rem eligendi alias accusantium unde animi praesentium neque quis, natus iusto quasi corporis ipsa eveniet placeat voluptate quidem."