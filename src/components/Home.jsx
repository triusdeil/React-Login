import { useAuth } from "../context/authContext"

export function Home(){
    const {user,loading, logout} = useAuth();
    const handleLogout = async() =>{
        try{
            await logout();
        }catch(error){
            console.error(error)
        }
    }
    if (loading) return <h1>Loading</h1>
    return (<div>
        <h1>Welcome {user.displayName || user.email}</h1>
        <button onClick={handleLogout}>logout</button>
    </div>)
}