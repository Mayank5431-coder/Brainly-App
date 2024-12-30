import {Dashboard} from "./pages/Dahboard"
import { Signup } from "./pages/Signup";
import {Signin} from "./pages/Signin"
import { Route , Routes } from "react-router-dom";

function App() {
  return ( 
    <>
      <Routes>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </>
   );
}

export default App;