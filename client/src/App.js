import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import AllNotes from "./pages/AllNotes";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Auth from "./middleware/auth";
import EditNote from "./pages/EditNote";
import CreateNote from "./pages/CreateNote";

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster
        toastOptions={{
          className: "",
          style: {
            color: "#303030",
          },
          success: {
            style: {
              color: "green",
            },
          },
          error: {
            style: {
              color: "red",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/allnotes"
          element={
            <Auth>
              <AllNotes />
            </Auth>
          }
        />
        <Route
          path="/profile"
          element={
            <Auth>
              <Profile />
            </Auth>
          }
        />
        <Route
          path="/note/:id"
          element={
            <Auth>
              <EditNote />
            </Auth>
          }
        />
        <Route
          path="/createnote"
          element={
            <Auth>
              <CreateNote />
            </Auth>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
