import "./styles/App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
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
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />

        <Route path="/Home" element={<HomePage />}>
          <Route index element={<DesktopWithFiles />} />
          <Route path="note/:name" element={<Note />} />
          <Route path="todo/:name" element={<Todo />} />
          <Route path="table/:name" element={<Table />} />
          <Route path="Diary/:name" element={<Diary />} />
          <Route path="Dashboard/:name" element={<Dashboard />} />
          <Route path="checklist/:name" element={<ChecklistModule />} />

          <Route path="Settings" element={<SettingsPage />}>
            <Route path="Cloud_storage" element={<CloudStorage />} />
            <Route path="Appearance" element={<Appearence />} />
            <Route path="Account_settings" element={<AccountSettings />} />
            <Route path="Terms_and_Policy" element={<TermsAndPolicy />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
