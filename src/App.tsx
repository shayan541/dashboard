import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Todo from "./pages/Todo";
import Weather from "./pages/Weather";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import RequiredAuth from "./components/RequiredAuth";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<RequiredAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/weather" element={<Weather />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
