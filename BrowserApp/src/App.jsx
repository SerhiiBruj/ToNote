import "./styles/App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import HomePage from "./Pages/homePage.jsx";
import NotFoundPage from "./Pages/notFoundPage.jsx";
import Login from "./Pages/LogIn.jsx";
import { useDispatch, useSelector } from "react-redux";
import { doHaveData, setUserData } from "./redux/UserData.js";
import { updatePages } from "./redux/pagesSlice.js";
import axios from "axios";
import About from "./Pages/About.jsx";
import WhatIsIt from "./AboutPageComponents/WhatIsIt.jsx";
import Technologies from "./AboutPageComponents/Technologies.jsx";
import Creator from "./AboutPageComponents/Creator.jsx";

const DesktopWithFiles = lazy(() =>
  import(
    "./mainPageModules/rigtSidePageComponents/desktopWithFilesModule/desktopWithFiles.jsx"
  )
);
const Note = lazy(() =>
  import(
    "./mainPageModules/rigtSidePageComponents/fileDesktopComponents/noteModule/note.jsx"
  )
);
const Todo = lazy(() =>
  import(
    "./mainPageModules/rigtSidePageComponents/fileDesktopComponents/todoModule/todo.jsx"
  )
);
const Table = lazy(() =>
  import(
    "./mainPageModules/rigtSidePageComponents/fileDesktopComponents/tableModule/table.jsx"
  )
);
const Diary = lazy(() =>
  import(
    "./mainPageModules/rigtSidePageComponents/fileDesktopComponents/diaryModule/diary.jsx"
  )
);
const Dashboard = lazy(() =>
  import(
    "./mainPageModules/rigtSidePageComponents/fileDesktopComponents/dashboardModule/dashboard.jsx"
  )
);
const ChecklistModule = lazy(() =>
  import(
    "./mainPageModules/rigtSidePageComponents/fileDesktopComponents/сheckListModule/checklist.jsx"
  )
);
const SettingsPage = lazy(() =>
  import("./mainPageModules/rigtSidePageComponents/Settings/SettingsPage.jsx")
);
const CloudStorage = lazy(() =>
  import(
    "./mainPageModules/rigtSidePageComponents/Settings/settingsPages/CloudStorage.jsx"
  )
);
const Appearence = lazy(() =>
  import(
    "./mainPageModules/rigtSidePageComponents/Settings/settingsPages/Appearence.jsx"
  )
);
const AccountSettings = lazy(() =>
  import(
    "./mainPageModules/rigtSidePageComponents/Settings/settingsPages/AccountSettings.jsx"
  )
);
const TermsAndPolicy = lazy(() =>
  import(
    "./mainPageModules/rigtSidePageComponents/Settings/settingsPages/TermsAndPolicy.jsx"
  )
);

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const token =
    !!localStorage.getItem("token") && localStorage.getItem("token");
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.pages.value);

  useEffect(() => {
    if (!localStorage.getItem("beLocal")) {
      const verifyToken = async () => {
        if (!token) {
          setIsAuthenticated(false);
          return;
        }
        try {
          const response = await axios.get(
            "http://localhost:3000/authentification",
            {
              headers: {
                authorization: `Bearer ${token}`,
                clientTime: new Date().getTime(),
              },
            }
          );
          if (response.status === 200) {
            if (pages.length < 1 && (await GCS(token))) {
              dispatch(updatePages());
            }

            setIsAuthenticated(true);
            dispatch(
              setUserData({
                userName: response.data.decoded.username,
                email: response.data.decoded.email,
                imageUrl: response.data.imageUrl,
              })
            );

            dispatch(doHaveData());
          }
        } catch (error) {
          setIsAuthenticated(false);
        }
      };
      verifyToken();
    }
  }, []);
  if(localStorage.getItem("beLocal"))
    return children
  if (isAuthenticated === null) {
    return <Loading />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/authentification" />;
  }
  return children;
};

function App() {
  useEffect(() => {
    if (localStorage.getItem("animations")) {
      if (!JSON.parse(localStorage.getItem("animations"))) {
        const style = document.createElement("style");
        style.innerHTML = `* {
          transition: none !important;
        }`;
        document.head.appendChild(style);
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Home" />} />
      <Route path="/About" element={<About />}>
        <Route path="Technologies" element={<Technologies/>}></Route>
        <Route path="WhatIsIt" element={<WhatIsIt/>}></Route>
        <Route path="Creator" element={<Creator/>}></Route>
      </Route>
      <Route
        path="/Home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <DesktopWithFiles />
            </Suspense>
          }
        />
        <Route
          path="note/:name"
          element={
            <Suspense fallback={<Loading />}>
              <Note />
            </Suspense>
          }
        />
        <Route
          path="todo/:name"
          element={
            <Suspense fallback={<Loading />}>
              <Todo />
            </Suspense>
          }
        />
        <Route
          path="table/:name"
          element={
            <Suspense fallback={<Loading />}>
              <Table />
            </Suspense>
          }
        />
        <Route
          path="Diary/:name"
          element={
            <Suspense fallback={<Loading />}>
              <Diary />
            </Suspense>
          }
        />
        <Route
          path="Dashboard/:name"
          element={
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="checklist/:name"
          element={
            <Suspense fallback={<Loading />}>
              <ChecklistModule />
            </Suspense>
          }
        />
        <Route
          path="Settings"
          element={
            <Suspense fallback={<Loading />}>
              <SettingsPage />
            </Suspense>
          }
        >
          <Route
            path="Storage"
            element={
              <Suspense fallback={<Loading />}>
                <CloudStorage />
              </Suspense>
            }
          />
          <Route
            path="Appearance"
            element={
              <Suspense fallback={<Loading />}>
                <Appearence />
              </Suspense>
            }
          />
          <Route
            path="Account_settings"
            element={
              <Suspense fallback={<Loading />}>
                <AccountSettings />
              </Suspense>
            }
          />
          <Route
            path="Terms_and_Policy"
            element={
              <Suspense fallback={<Loading />}>
                <TermsAndPolicy />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route path="/authentification" element={<Login />} />
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/404" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

const GCS = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/get-uploaded-file",
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

const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="loader">
        <svg
          width="218"
          height="249"
          viewBox="0 0 218 249"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50.3626 239.103C58.6746 246.677 82.0279 243.333 92.3154 242.851C103.196 242.34 113.772 239.825 123.641 235.855C133.995 231.689 149.972 221.102 155.045 218.366C163.567 213.77 169.14 211.37 179.608 204.375C190.076 197.379 194.8 194.298 200.408 186.886C216.431 165.707 214.849 131.511 208.361 104.54C203.203 83.0934 188.271 64.2174 172.454 49.5496C151.697 30.3002 126.166 15.3295 98.5752 8.66016C83.0619 4.91021 67.7565 3.63911 52.0399 6.76394C41.5426 8.85105 28.2525 11.7444 20.7068 20.1064C14.1573 27.3644 11.4569 39.0882 8.7032 48.1705C5.42256 58.9908 2.64745 69.7408 8.04971 80.3718C21.3841 106.612 46.9813 126.441 72.7108 139.292C96.0094 150.93 123.526 160.301 148.894 150.394C156.63 147.373 164.656 143.146 171.422 138.293C178.971 132.878 181.174 125.489 179.608 116.434C175.839 94.6471 156.891 77.9209 137.957 68.7186C130.655 65.1702 122.788 63.2206 114.981 61.1337C104.837 58.4222 93.6244 54.761 83.1666 58.1687C74.7267 60.9189 66.2361 67.6418 60.776 74.5797C58.5612 77.3938 55.8468 81.7688 57.8525 85.4054C61.1108 91.3131 67.733 96.0686 72.9515 100.092C78.8786 104.663 85.1653 107.957 92.3154 110.16C103.918 113.734 115.998 115.558 128.085 116.365"
            stroke="#C2C2C2"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h1 style={{ color: "gray", fontSize: 35 }}>Loading</h1>
    </div>
  );
};

// const NotificationComponent = () => {
//   const [permission, setPermission] = useState(null);

//   // Функція для запиту дозволу на показ сповіщень
//   const requestNotificationPermission = () => {
//     if ('Notification' in window) {
//       Notification.requestPermission().then(permission => {
//         setPermission(permission);
//       });
//     } else {
//       console.log('Ваш браузер не підтримує сповіщення');
//     }
//   };

//   // Функція для створення сповіщення
//   const showNotification = () => {
//     if (permission === 'granted') {
//       new Notification('Заплановане сповіщення!', {
//         body: 'Це сповіщення було заплановане.',
//       });
//     }
//   };

//   // Функція для планування сповіщення
//   const scheduleNotification = (delayInSeconds) => {
//     const delayInMilliseconds = delayInSeconds * 1000;
//     setTimeout(() => {
//       showNotification();
//     }, delayInMilliseconds);
//   };

//   // Викликаємо функцію планування, наприклад, через 10 секунд після завантаження компоненту
//   useEffect(() => {
//     requestNotificationPermission();
//     scheduleNotification(10); // Сповіщення через 10 секунд
//   }, []);

//   return (
//     <div>
//       <h1>Заплановане сповіщення у браузері</h1>
//       {permission === 'granted' ? (
//         <p>Дозвіл на сповіщення надано</p>
//       ) : permission === 'denied' ? (
//         <p>Сповіщення заблоковані</p>
//       ) : (
//         <p>Запит на дозвіл для сповіщень</p>
//       )}
//     </div>
//   );
// };
