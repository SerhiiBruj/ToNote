import "./styles/App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import HomePage from "./Pages/homePage.jsx";
import NotFoundPage from "./Pages/notFoundPage.jsx";
import Note from "./mainPageModules/rigtSidePageComponents/fileDesktopComponents/noteModule/note.jsx";
import DesktopWithFiles from "./mainPageModules/rigtSidePageComponents/desktopWithFilesModule/desktopWithFiles.jsx";
import ChecklistModule from "./mainPageModules/rigtSidePageComponents/fileDesktopComponents/сheckListModule/checklist.jsx";
import Table from "./mainPageModules/rigtSidePageComponents/fileDesktopComponents/tableModule/table.jsx";
import Todo from "./mainPageModules/rigtSidePageComponents/fileDesktopComponents/todoModule/todo.jsx";
import Diary from "./mainPageModules/rigtSidePageComponents/fileDesktopComponents/diaryModule/diary.jsx";
import Dashboard from "./mainPageModules/rigtSidePageComponents/fileDesktopComponents/dashboardModule/dashboard.jsx";
import SettingsPage from "./mainPageModules/rigtSidePageComponents/Settings/SettingsPage.jsx";
import CloudStorage from "./mainPageModules/rigtSidePageComponents/Settings/settingsPages/CloudStorage.jsx";
import AccountSettings from "./mainPageModules/rigtSidePageComponents/Settings/settingsPages/AccountSettings.jsx";
import Appearence from "./mainPageModules/rigtSidePageComponents/Settings/settingsPages/Appearence.jsx";
import TermsAndPolicy from "./mainPageModules/rigtSidePageComponents/Settings/settingsPages/TermsAndPolicy.jsx";
import Login from "./Pages/LogIn.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { doHaveData, setUserData } from "./redux/UserData.js";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Статус аутентифікації
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const GCS = async () => {
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
      return response.data;
    } catch (er) {
      console.error(er);
    }
  };
  useEffect(() => {
    console.log();
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
        GCS();

        setIsAuthenticated(true);
        dispatch(
          setUserData({
            userName: response.data.decoded.username,
            email: response.data.decoded.email,
            imageUrl: response.data.imageUrl,
          })
        );

        dispatch(doHaveData());
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/authentification" />;
  }
  return children;
};

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route
          path="/Home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        >
          <Route index element={<DesktopWithFiles />} />
          <Route path="note/:name" element={<Note />} />
          <Route path="todo/:name" element={<Todo />} />
          <Route path="table/:name" element={<Table />} />
          <Route path="Diary/:name" element={<Diary />} />
          <Route path="Dashboard/:name" element={<Dashboard />} />
          <Route path="checklist/:name" element={<ChecklistModule />} />

          <Route path="Settings" element={<SettingsPage />}>
            <Route path="Storage" element={<CloudStorage />} />
            <Route path="Appearance" element={<Appearence />} />
            <Route path="Account_settings" element={<AccountSettings />} />
            <Route path="Terms_and_Policy" element={<TermsAndPolicy />} />
          </Route>
        </Route>

        <Route path="/authentification" element={<Login />} />

        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
