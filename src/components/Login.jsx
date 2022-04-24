import {useState} from "react"
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export function Login(){
  const [user, setUser] = useState({
    email:"",
    password:""
  });
  const [error, setError] = useState("")
  
  const {login,loginWithGoogle} = useAuth();
  const navigate = useNavigate()
  const handleChange = ({target: {name,value}}) =>{
    setUser({...user,[name]:value})
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      await login(user.email,user.password);
      navigate("/")
    }catch(error){
      setError(error.message)
      if(error.code === "auth/weak-password"){
        setError("password muy corto debe ser mayor de 6 caracteres")
      }
      if(error.code === "auth/invalid-email"){
        setError("correo invalido por favor revise su correo")
      }
      if(error.code === "auth/email-already-in-use"){
        setError("el correo esta en uso por favor introduzca un correo nuevo")
      }
    }
    
  }

  const handlegoogleSingIn = async() => {
    try{
    navigate("/")
  }catch(error){
    setError(error.message);
  }}

  return(<div>
     {error && <Alert message={error}/>}
  <form onSubmit={handleSubmit}>
    <label htmlFor="email">Email</label>
    <input type="text" placeholder="youremail@company.ltd" name="email" onChange={handleChange}/>

    <label htmlFor="password">Password</label>
    <input type="password" name="password" id="password" onChange={handleChange}/>

    <button type="submit">Login</button>
  </form>
  <button onClick={handlegoogleSingIn}>Login Google</button>
  <a href="#">Forgot password?</a>
  </div>
  )
}