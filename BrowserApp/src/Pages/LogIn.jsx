import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";
import { useDispatch } from "react-redux";
import { doHaveData, setUserData } from "../redux/UserData";
import { updatePages } from "../redux/pagesSlice";
import mylocalip from "../../../mylocalip";
const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token =
    !!localStorage.getItem("token") && localStorage.getItem("token");
  const dispatch = useDispatch();
  const [refHeight, setRefDimensions] = useState([0, 0]);
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://" + mylocalip + ":3000/login", {
        username,
        password,
        headers: {
          clientTime: new Date().getTime(),
        },
      });

      const token = response.data.token;

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
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!isEmail(email) || username.length < 6 || password.length < 6) {
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

  const switchSide = () => {
    setIsLoggingIn(!isLoggingIn);
    setError(null);
    setUsername("");
    setPassword("");
    setEmail("");

    if (ref.current.offsetWidth === window.innerWidth * 2) {
      console.log("object");
      if (ref.current.style.transform === "translateX(100vw)")
        ref.current.style.transform = "translateX(0)";
      else ref.current.style.transform = "translateX(100vw)";
    }
  };
  useEffect(() => {
    if (ref.current) {
      setRefDimensions([ref.current.offsetHeight, ref.current.offsetWidth]);
    }
  }, []);
  return (
    <div className="loginCenterDiv">
      <h1>Бек-енд ще не захощено тому скористуйтеся кнопкою знизу</h1>
      <div className="authContteiner" ref={ref}>
        <div className="logInCont aucont">
          <form className="AuthForm" onSubmit={handleLogin}>
            <h1>Log In</h1>
            <div>
              <label>
                <span>Username/Email</span>
                <input
                  type="text"
                  placeholder="example123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
            <p style={{ color: "red", opacity: error && !isLoggingIn ? 1 : 0 }}>
            Невірний логін або пароль
            </p>
            <button className="submit" type="submit">
              Log in
            </button>
          </form>
          <button className="submit switch" id="swtoReg" onClick={switchSide}>
            Registration
          </button>
        </div>
        <div className="RegistrationCont aucont">
          <form className="AuthForm" onSubmit={handleRegister}>
            <h1>Registration</h1>
            <div>
              <label>
                <span>Email </span>
                <input
                  type="text"
                  placeholder="example@gmail.com"
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
                  onChange={(e) => setUsername(e.target.value)}
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
            <p style={{ color: "red", opacity: error && isLoggingIn ? 1 : 0 }}>
            Невірний логін або пароль
            </p>
            <button type="submit" className="submit">
              Register
            </button>
          </form>
          <button className="submit switch" onClick={switchSide}>
            Log in
          </button>
        </div>
        <div
          className="Curtain"
          style={{
            height: refHeight[0] - 9,
            width: refHeight[1] / 2,
            borderRadius: isLoggingIn ? "45px 0 0 45px" : "0 45px 45px 0",
            transform: isLoggingIn ? "translateX(0%)" : "translateX(100%)",
            backgroundPositionX: isLoggingIn ? "0%" : "100%",
          }}
        >
          <div
            style={{
              backgroundPosition: isLoggingIn ? "60% 0%" : "109% 0%",
            }}
          ></div>
        </div>
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
        Продовжити без акаунту
      </h2>
    </div>
  );
};

export default Login;
