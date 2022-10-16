import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./common/components/Navbar";
import NotFound
 from "./common/components/NotFound";
import PrivateRoute from "./common/components/PrivateRoute";
import Authenticate from "./pages/Authenticate";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/users" element={<Users/>} />
      <Route path="/authenticate" element={<Authenticate/>} />
      <Route
        path="/profile"
        element={
         <PrivateRoute>
            <Profile/>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
  );
}

export default App;
