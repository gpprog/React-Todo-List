import './App.css';
import Main from './Main';
import Login from './Login';
import SignUp from './SignUp'
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import Container from '@material-ui/core/Container';

function App() {  







  
  
 
  return (

    <Router>
      <Container maxWidth = "xs">
        <div className="App-container">
          <header>
            <h1>Welcome to my todo App</h1>
          </header>
          <Switch>
            <Route exact path="/main">
              <Main />   
            </Route>
            <Route  exact path ="/">
              <Login/>
            

            </Route>
            <Route path="/signup">
              <SignUp/>

            </Route>

          </Switch>
          
        </div>
      </Container>

    </Router>

    
  );

  
}

export default App;
