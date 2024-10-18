import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ForgotPassword, Login, ResetPassword, Signup } from './isp/components/auth';
import { IspDashboard } from './isp/pages';
import LandingPageHeader from './isp/sections/LandingPageHeader';
import RegisterISP from './isp/sections/isp/RegisterISP';
import ChangePassword from './isp/components/auth/ChangePassword';
import QuatationCreate from './isp/components/QuatationCreate';
import Quotation from './isp/components/Quotation';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='quotation' element={<QuatationCreate />}/>
          <Route path='create-quotation' element={<QuatationCreate />}/>
          <Route path='/isp' element={<LandingPageHeader />}>
            <Route path='dashboard' element={<IspDashboard />} />
            <Route path='register-isp' element={<RegisterISP />} />
            <Route path='change-pass' element={<ChangePassword />} />
          </Route>

          <Route path='/:urltoken' element={<Login />} />
          <Route path='/' element={<QuatationCreate />} />
          <Route path='/isp' >
            <Route path="login/:urltoken" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password/:urltoken" element={<ResetPassword />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </div>     
    </>
  )
}

export default App