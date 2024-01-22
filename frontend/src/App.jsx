import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import PrivatePage from "./pages/PrivatePage"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route element={<PrivatePage/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
