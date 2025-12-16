import './App.css'
import Login from './components/Login'
import { Switch, Route } from 'react-router-dom';
import Success from './components/Success';
import Error from './components/Error';


function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      
      <Route path="/success">
        <Success />
      </Route>

      <Route path="/error">
        <Error />
      </Route>
    </Switch>
  );
}

export default App
