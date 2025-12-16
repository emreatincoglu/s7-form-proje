import './App.css'
import Login from './components/Login'
import { Switch, Route } from 'react-router-dom';
import Success from './components/Success';


function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      
      <Route path="/success">
        <Success />
      </Route>
    </Switch>
  );
}

export default App
