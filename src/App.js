
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './screens/login';
import Drive from './screens/drive';
import Register from './screens/register';
import Logout from './components/logout';
import Home from './screens/home';



function App() {
  return (
    <Router>
      <Switch>
        
      <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/drive">
            <Drive/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/logout">
            <Logout/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
