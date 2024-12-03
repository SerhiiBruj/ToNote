/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";
import { useDispatch } from "react-redux";
import { doHaveData, setUserData } from "../redux/UserData";
import { updatePages } from "../redux/pagesSlice";
import mylocalip from "../../../mylocalip";
const Authentification = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const navigate = useNavigate();
  const token =
    !!localStorage.getItem("token") && localStorage.getItem("token");
  const dispatch = useDispatch();
  const ref = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("beLocal")) {
      const verifyToken = async () => {
        if (!token) {
          return;
        }
        try {
          const response = await axios.get(
            "http://" + mylocalip + ":3000/authentification",
            {
              headers: {
                authorization: `Bearer ${token}`,
                clientTime: new Date().getTime(),
              },
            }
          );
          if (response.status === 200) {
            dispatch(updatePages());

            dispatch(
              setUserData({
                userName: response.data.decoded.username,
                email: response.data.decoded.email,
                imageUrl: response.data.imageUrl,
              })
            );

            dispatch(doHaveData());
          }
          navigate("/Home");
        } catch (error) {
          console.error("fdsfds");
        }
      };
      verifyToken();
    }
  }, []);

  const switchSide = () => {
    setIsLoggingIn(!isLoggingIn);

    if (ref.current.offsetWidth === window.innerWidth * 2) {
      console.log("object");
      if (ref.current.style.transform === "translateX(100vw)")
        ref.current.style.transform = "translateX(0)";
      else ref.current.style.transform = "translateX(100vw)";
    }
  };

  return (
    <div className="loginCenterDiv">
      <h1 className="excuseText">
        The back-end hasn&apos;t been hosted yet, so please press the button
        below the form
      </h1>
      <div className="authContteiner" ref={ref}>
        <LogIn navigate={navigate} switchSide={switchSide} />
        <Register navigate={navigate} switchSide={switchSide} />
        <Curtain isLoggingIn={isLoggingIn} />
      </div>
      <h2
        style={{
          color: "gray",
          paddingTop: 20,
          width: "100vw",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/Home");
          localStorage.setItem("beLocal", "1");
        }}
      >
        Continue without account
      </h2>
    </div>
  );
};

export default Authentification;

const Register = (props) => {
  const { navigate, switchSide } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email))) {
      setError("your email is incorrect");
      return
    }
    if (!(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password))) {
      if (password.length < 8) setError("your password is too short");
      else setError("your password must contein 8 symbols");
      return
    
    }
    if (!(/[a-zA-Z0-9]{4,15}/.test(username))) {
      if (password.length < 8) setError("your password is too short");
      else setError("your password must contein 8 symbols");
      return
    }

    try {
      if (!isEmail(email) || username.length < 6 || password.length > 6) {
        setError("Невірний емейл");
        throw error;
      }
      const response = await axios.post(
        "http://" + mylocalip + ":3000/register",
        {
          username,
          email,
          password,
          headers: {
            clientTime: new Date().getTime(),
          },
        }
      );
      console.log(response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);

      dispatch(setUserData({ username, email }));
      dispatch(doHaveData());
      navigate("/");
    } catch (err) {
      setError("Невірний логін або пароль", err.message);
    }
  };
  return (
    <div className="RegistrationCont aucont">
      <form className="AuthForm" onSubmit={handleRegister}>
        <h1>Registration</h1>
        <div>
          <label>
            <span>Email </span>
            <input
              type="text"
              placeholder="example@gmail.com"
              pattern="[a-z0-9]{5,}+@[a-z]{2,}.[a-zA-Z]{2,}"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <span>Username</span>
            <input
              type="text"
              placeholder="example123"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value.replace(/[\s/_]/gi, ""))
              }
            />
          </label>
          <div>
            <label>
              <span>Password</span>
              <input
                type="password"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <span style={{ minHeight: "1.5em" }}>{error}</span>
          </div>
        </div>

        <button type="submit" className="submit">
          Register
        </button>
      </form>
      <button className="submit switch" onClick={switchSide}>
        Log in
      </button>
    </div>
  );
};

const LogIn = (props) => {
  const { switchSide, navigate } = props;
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    if (login < 5) setError("The login or password is incorrect");
    try {
      const response = await axios.post("http://" + mylocalip + ":3000/login", {
        login,
        password,
        headers: {
          clientTime: new Date().getTime(),
        },
      });

      const token = response.data.token;
      const res = await axios.get(
        "http://" + mylocalip + ":3000/authentification",
        {
          headers: {
            authorization: `Bearer ${token}`,
            clientTime: new Date().getTime(),
          },
        }
      );
      if (res.status === 200) {
        await GCS(token);
        dispatch(updatePages());
      }

      localStorage.setItem("token", token);
      localStorage.removeItem("beLocal");

      dispatch(
        setUserData({
          userName: response.data.username,
          email: response.data.email,
        })
      );
      dispatch(doHaveData());
      navigate("/Home");
    } catch (err) {
      setError("Невірний логін або пароль");
    }
  };
  return (
    <div className="logInCont aucont">
      <form className="AuthForm" onSubmit={handleLogin}>
        <h1>Log In</h1>
        <div>
          <label>
            <span>Username/Email</span>

            <input
              type="text"
              placeholder="example123"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <span>Password</span>
            <input
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <span style={{ minHeight: "1.5em" }}>{error}</span>

        <button className="submit" type="submit">
          Log in
        </button>
      </form>
      <button className="submit switch" id="swtoReg" onClick={switchSide}>
        Registration
      </button>
    </div>
  );
};
//Sliding CURTAIN
const Curtain = ({ isLoggingIn }) => {
  return (
    <div
      className="Curtain"
      style={{
        borderRadius: isLoggingIn ? "45px 0 0 45px" : "0 45px 45px 0",
        transform: isLoggingIn ? "translateX(-5%)" : "translateX(106%)",
        backgroundPositionX: isLoggingIn ? "0%" : "100%",
      }}
    >
      <div
        style={{
          backgroundPosition: isLoggingIn ? "60% 0%" : "109% 0%",
        }}
      ></div>
    </div>
  );
};

//GET CLUD FILES
const GCS = async (token) => {
  try {
    const response = await axios.get(
      "http://" + mylocalip + ":3000/get-uploaded-file",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    for (let i = 0; i < response.data.userFiles.length; i++) {
      sessionStorage.setItem(
        response.data.userFiles[i].name,
        response.data.userFiles[i].value
      );
    }
    return true;
  } catch (er) {
    console.error(er);
    return false;
  }
};
