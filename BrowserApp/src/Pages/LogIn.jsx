import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";
import { useDispatch } from "react-redux";
import { doHaveData, setUserData } from "../redux/UserData";
const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      // Отримання токену
      const token = response.data.token;

      // Збереження токену в localStorage
      localStorage.setItem("token", token);
      dispatch(
        setUserData({
          userName: response.data.username,
          email: response.data.email,
        })
      );
      dispatch(doHaveData());
      navigate("/");
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
      const response = await axios.post("http://localhost:3000/register", {
        username,
        email,
        password,
      });
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
  };

  return (
    <div className="loginCenterDiv">
      <div
        className="authContteiner"
        style={{ background: "none", justifyContent: "space-between", width: "50vw",minWidth:"700px" }}
      >
        <div className="logInCont" style={{ width: "50%" }}>
          <form className="AuthForm" onSubmit={handleLogin}>
            <h1
              style={{
                fontSize: 30,
              }}
            >
              Log In
            </h1>
            <div>
              <label>Username/Email</label>
              <input
                type="text"
                placeholder="example123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="submit"
              style={{
                width: "fit-content",
                background: " rgba(85, 85, 85, 0.5)",
              }}
              type="submit"
            >
              Log in
            </button>
          </form>
          <button
            className="submit"
            style={{
              width: "fit-content",
              background: " rgba(85, 85, 85, 0.5)",
              backgroundColor: "transparent",
              textDecoration: "underline",
            }}
            onClick={switchSide}
          >
            Registration
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className="RegistrationCont">
          <form className="AuthForm" onSubmit={handleRegister}>
            <h1
              style={{
                fontSize: 30,
              }}
            >
              Registration
            </h1>
            <div>
              <label>Email</label>
              <input
                type="text"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Username</label>
              <input
                type="text"
                placeholder="example123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "fit-content",
                background: " rgba(85, 85, 85, 0.5)",
              }}
              className="submit"
            >
              Register
            </button>
          </form>
          <button
            className="submit"
            style={{
              width: "fit-content",
              background: " rgba(85, 85, 85, 0.5)",
              backgroundColor: "transparent",
              textDecoration: "underline",
            }}
            onClick={switchSide}
          >
            Log in
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div
          className="Curtain"
          style={{
            width: "25%",
            minWidth: "340px",
            borderRadius: isLoggingIn ? "45px 0 0 45px" : "0 45px 45px 0",
            transform: isLoggingIn ? "translateX(0%)" : "translateX(100%)",
            backgroundPositionX: isLoggingIn ? "0%" : "100%",
            padding: "10px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "300%",
              backgroundPosition: isLoggingIn ? "60% 0%" : "109% 0%",
              transition: "background-position 0.5s ease",
              padding: "15px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
