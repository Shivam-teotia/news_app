import './App.css';
import React,{useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App=()=> {
  const [progress, setProgress] = useState(0);
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          color='#f11946'
          height={4}
          progress={progress}
          //onLoaderFinished={() => setProgress(0)}
          />
          <Switch>
            <Route exact path="/"><News setProgress={setProgress} key="general" country="in" pageSize={6} category="general" /></Route>
            <Route exact path="/business"><News setProgress={setProgress} key="business" country="in" pageSize={6} category="business" /></Route>
            <Route exact path="/sports"><News setProgress={setProgress} key="sports"country="in" pageSize={6} category="sports" /></Route>
            <Route exact path="/health"><News setProgress={setProgress} key="health"country="in" pageSize={6} category="health" /></Route>
            <Route exact path="/science"><News setProgress={setProgress} key="scinece"country="in" pageSize={6} category="science" /></Route>
            <Route exact path="/technology"><News setProgress={setProgress} key="technology"country="in" pageSize={6} category="technology" /></Route>
            <Route exact path="/entertainment"><News setProgress={setProgress}  key="entertainment"country="in" pageSize={6} category="entertainment" /></Route>
          </Switch>
        </Router>
      </div>
    )
  }

export default App;