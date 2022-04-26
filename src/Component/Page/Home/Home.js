import React from 'react'

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
      <p className="btnBoard">Invité</p>
      <p onClick={boardChoice} className="btnBoard">Connexion</p>
    </div>
  )
}
class LogBoard extends React.Component{
  render(){
    return(
      <p>LogBoard</p>
    )
  }
}
