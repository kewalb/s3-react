import { useEffect } from "react"
import { useHistory } from "react-router"

function Logout(){

    const history = useHistory()
    useEffect(() => {
        localStorage.removeItem("user")
        localStorage.removeItem("x-auth-token")
    })
    return(
        <div>
        {alert("log out successful")}
        {history.push('/login')}
        </div>
    )
}

export default Logout