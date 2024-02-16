import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignupForm from './login/signup';
import SigninForm from './login/signin';
import Products from './components/product/product';
import ForgetPassword from './login/forgetPassword';
import ResetPassword from './login/resetPassword';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SigninForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/products' element={<Products />} />
          <Route path='/forgetPass' element={<ForgetPassword/>}/>
          <Route path='/resetpassword/:userId/:token' element={<ResetPassword />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
