import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component{
  render(){
    return(
      <div className="bg_blue FullVH">
        <div className="TopHome">
          <h1 className="logo lgw">WOOGO<span className="fontr">®</span></h1>
        </div>
        <DownHome/>
      </div>
    )
  }
}
export default Home

class DownHome extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "create_state": false
    }
  }
  openChoice = (e) => {
    this.setState({"create_state": true})
  }
  render(){
    return(
      <div className="DownHome">
      {this.state.create_state ? <HomeChoice /> : <ButtonCreate openChoice={this.openChoice}/>}
        <p className="copyright">Copyright WebProvide 2022</p>
      </div>
    )
  }
}
function ButtonCreate({openChoice}){
  return(
    <p onClick={openChoice} className="btnBoard sChoice">Créer</p>
  )
}
class HomeChoice extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "board_choice": false
    }
  }
  boardChoice = (e) => {
    this.setState({"board_choice": true})
  }
  render(){
    return(
      <div className="HomeChoice">
        {this.state.board_choice ? <LogBoard /> : <SelectBoard boardChoice={this.boardChoice}/>}
      </div>
    )
  }
}
function SelectBoard({boardChoice}){
  return(
    <div className="SelectBoard">
      <Link to="/guess">
        <p className="btnBoard">Invité</p>
      </Link>
      <p onClick={boardChoice} className="btnBoard">Enregistré</p>
    </div>
  )
}
class LogBoard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "subscribe": false
    }
  }
  subscriber = (e) => {
    this.setState({"subscribe": true})
  }
  render(){
    return(
      <div className="LogBoard">
        {this.state.subscribe ? <SubForm /> : <LogForm subscribe={this.subscriber}/>}
      </div>
    )
  }
}

class LogForm extends React.Component{
  render(){
    return(
      <div className="LogForm">
        <form className="LogPos">
          <input className="putLog" name="logMail" type="email" placeholder="E-mail" />
          <p className="errorLog"></p>
          <input className="putLog" name="logPwd" type="password" placeholder="Mot de Passe" />
          <p className="errorLog"></p>
          <input className="btnBoard" name="logSubmit" type="submit" value="Connexion" />
        </form>
        <div className="SubLog">
          <p className="wSub">Pas encore inscrit ?</p>
          <p onClick={this.props.subscribe} className="btnBoard">Inscription</p>
        </div>
      </div>
    )
  }
}
class SubForm extends React.Component{
  render(){
    return(
      <div className="SubForm">
        <form className="LogPos">
          <input className="putLog" name="subName" type="text" placeholder="Nom" />
          <p className="errorLog"></p>
          <input className="putLog" name="subMail" type="email" placeholder="E-mail" />
          <p className="errorLog"></p>
          <input className="putLog" name="subPwd" type="password" placeholder="Mot de Passe" />
          <p className="errorLog"></p>
          <input className="putLog" name="subPwdR" type="password" placeholder="Répéter Mot de Passe" />
          <p className="errorLog"></p>
          <input className="btnBoard" name="subSubmit" type="submit" value="Inscription" />
          <div className="BlockCGV">
            <input className="subCGV" type="radio" name="subCGV" value="Accepter les CGV" />
            <label htmlFor="subCGV">Accepter les CGV</label>
          </div>
        </form>
      </div>
    )
  }
}
