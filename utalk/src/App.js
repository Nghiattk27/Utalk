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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Userform" element={<UserForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
