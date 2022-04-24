import {Route,Routes} from "react-router-dom"
import {Home} from './components/Home';
import {Login} from './components/Login'
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import {Register} from './components/Register'
import {AuthProvider} from './context/authContext'
function App (){
  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={
          <ProtectedRoutes>
            <Home/>
          </ProtectedRoutes>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </AuthProvider>
  )
}

export default App