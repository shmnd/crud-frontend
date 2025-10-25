import { BrowserRouter, Routes, Route, Navigate }  from 'react-router-dom';
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/loginPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Navigate to ="/login" replace />} />
        <Route path = "/login" element={<LoginPage/>} />
        <Route path = "/signup" element={<SignUpPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
