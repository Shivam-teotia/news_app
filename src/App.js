import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends Component {
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          color='#f11946'
          height={4}
          progress={this.state.progress}
          //onLoaderFinished={() => setProgress(0)}
          />
          <Switch>
            <Route exact path="/"><News setProgress={this.setProgress} key="general" country="in" pageSize={6} category="general" /></Route>
            <Route exact path="/business"><News setProgress={this.setProgress} key="business" country="in" pageSize={6} category="business" /></Route>
            <Route exact path="/sports"><News setProgress={this.setProgress} key="sports"country="in" pageSize={6} category="sports" /></Route>
            <Route exact path="/health"><News setProgress={this.setProgress} key="health"country="in" pageSize={6} category="health" /></Route>
            <Route exact path="/science"><News setProgress={this.setProgress} key="scinece"country="in" pageSize={6} category="science" /></Route>
            <Route exact path="/technology"><News setProgress={this.setProgress} key="technology"country="in" pageSize={6} category="technology" /></Route>
            <Route exact path="/entertainment"><News setProgress={this.setProgress}  key="entertainment"country="in" pageSize={6} category="entertainment" /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
