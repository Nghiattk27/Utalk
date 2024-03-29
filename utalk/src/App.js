import './App.css';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from "./Login/Login.js";
import Profile from "./Profile/Profile";
import UserForm from './UserForm/UserForm';
import MyEditorFunction from './MyEditor/MyEditorFunction';
import Newfeed from './Newfeed/Newfeed/Newfeed';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Userform" element={<UserForm />} />
          <Route path="/UpdateAvatar" element={<MyEditorFunction />} />
          <Route path="/Newfeed" element={<Newfeed />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
