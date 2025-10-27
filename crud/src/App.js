import { BrowserRouter, Routes, Route, Navigate }  from 'react-router-dom';
import SignUpPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/loginPage";
import Homepage from './pages/home/homePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Navigate to ="/login" replace />} />
        <Route path = "/login" element={<LoginPage/>} />
        <Route path = "/signup" element={<SignUpPage/>}/>
        <Route path = "/home" element = {<Homepage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
