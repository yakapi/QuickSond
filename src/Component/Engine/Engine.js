import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "../Page/Home/Home"
import Guess from "../Page/Guess/Guess"
import SurveyGuess from "../Page/Guess/SurveyGuess"

class Engine extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "test": false
    }
  }
  componentDidMount(){
    console.log("COMPONENT LOUNT");
  }
  render(){
    return(
      <Router>
        <EngineRouter />
      </Router>
    )
  }
}
export default Engine

function EngineRouter(){
  let location = useLocation()
  return(
    <Routes location={location}>
      <Route path="/" exact  element={<Home/>}/>
      <Route path="/guess" element={<Guess/>}/>
      <Route path="/guess/:survey" element={<SurveyGuess/>}/>
    </Routes>
  )
}
