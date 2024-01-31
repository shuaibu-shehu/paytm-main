import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PrivatePage from "./pages/PrivatePage";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<PrivatePage />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send-money/:id/:name" element={<SendMoney />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
