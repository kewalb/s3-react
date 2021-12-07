import Header from "../components/header";

function Home(){
    return(
        <div className="Login">
            <Header/>
            <h1 style={{textAlign: "center", margin:50}}>
                Welcome to your drive<br/>
                Login or Register to continue
            </h1>
        </div>
    )
}

export default Home;