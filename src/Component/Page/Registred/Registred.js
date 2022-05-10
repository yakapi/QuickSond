import React from "react"

class Registred extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "subscribe": false
    }
  }
  subscriber = (e) => {
    this.setState({"subscribe": true})
  }
  subscribing = (e) => {
    e.preventDefault()
    console.log(e.target);
    let data_to_send = {
        "call": "add_users",
      }
      // fetch('http://woogo-api.victorbarlier.fr/user.php',{
      //     method: 'post',
      //     credentials: 'include',
      //     headers:{
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      //       },
      //       body: Object.entries(data_to_send).map(([k,v])=>{return k+'='+v}).join('&')
      //     }).then(response => response.json()).then(data => {
      //         console.log(data);
      //         if (data.success) {
      //
      //         }
      //     })
  }
  render(){
    return(
      <div className="GuessBoard">
       <h1 className="logo lgw lwht">WG<span className="fontr">®</span></h1>
       <div className="GuessBlock">
        <div className="GuessBox">
            {this.state.subscribe ? <SubForm subscribing={this.subscribing}/> : <LogForm subscribe={this.subscriber} />}
        </div>
       </div>
       <p className="copyright cGuess">Copyright WebProvide 2022</p>
      </div>
    )
  }
}
export default Registred

class LogForm extends React.Component{
  render(){
    return(
      <div className="LogForm">
        <h2 className="title_form_registred">Connexion</h2>
        <form className="LogPos">
          <input className="putLog" name="logMail" type="email" pattern="^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$" placeholder="E-mail" />
          <p className="errorLog"></p>
          <input className="putLog" name="logPwd" type="password"  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$" placeholder="Mot de Passe" />
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
      <h2 className="title_form_registred">Inscription</h2>
        <form className="LogPos" onSubmit={this.props.subscribing}>
          <input className="putLog" name="subName" type="text" placeholder="Nom" pattern="[ a-zA-Z0-9,#.-]+" />
          <p className="errorLog"></p>
          <input className="putLog" name="subMail" type="email" pattern="^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$" placeholder="E-mail" />
          <p className="errorLog"></p>
          <input className="putLog" name="subPwd" type="password" placeholder="Mot de Passe" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$" />
          <p className="errorLog"></p>
          <input className="putLog" name="subPwdR" type="password" placeholder="Répéter Mot de Passe" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$" />
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
