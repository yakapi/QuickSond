import React from 'react'

class Guess extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "stape": false,
      "guess_array": [],
      "error": "",
      "result": false
    }
  }
  nameStape = (e) => {
    function isEmpty(str) {
      return (!str || str.length === 0 );
    }
    e.preventDefault()
    let array_stape = []
    console.log(e.target[0]);
    if (isEmpty(e.target[0].value)) {
      this.setState({"error": "Veuillez remplir le champ"})
    }else {
      if (!isEmpty(this.state.error)) {
        this.setState({"error": ""})
      }
      let new_array = []
      new_array.push(e.target[0].value)
      this.setState({"guess_array": new_array})
      this.setState({"stape": true})
    }
  }
  answerStape = (e) => {
    function isEmpty(str) {
      return (!str || str.length === 0 );
    }
    e.preventDefault()
    if (isEmpty(e.target[0].value)) {
      this.setState({"error": "Veuillez remplir le champ"})
    }else {
      if (!isEmpty(this.state.error)) {
        this.setState({"error": ""})
      }
      // array_final.push(this.state.guess_array[0])
      // array_final.push(e.target[0].value)
      let data_to_send = {
        "call": "add_survey",
        "type": "guess",
        "name": this.state.guess_array[0],
        "answer": e.target[0].value
      }
      fetch('http://woogo-api.victorbarlier.fr/guess.php',{
        method: 'post',
        credentials: 'include',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: Object.entries(data_to_send).map(([k,v])=>{return k+'='+v}).join('&')
      }).then(response => response.json()).then(data => {
        console.log(data);
      })


    }
  }
  render(){
    return(
      <div className="GuessBoard">
       <h1 className="logo lgw lwht">WG<span className="fontr">®</span></h1>
       <div className="GuessBlock">
        <div className="GuessBox">
          {this.state.result ? <ResultSondage/> : this.state.stape ? <GuessAnswer answerStape={this.answerStape} resultError={this.state.error}/> : <GuessName resultError={this.state.error} nameStape={this.nameStape} />}
        </div>
       </div>
       <p className="copyright cGuess">Copyright WebProvide 2022</p>
      </div>
    )
  }
}
export default Guess
class ResultSondage extends React.Component{
  render(){
    return(
      <div >
      <p>TEST</p>
      </div>
    )
  }
}
function GuessName({nameStape, resultError}){
  return(
    <div>
      <form className="stapeboard" onSubmit={nameStape}>
        <h2 className="TitleStape">Nom du Sondage</h2>
        <input className="putSond" type="text" name="nameSond" pattern="[ a-zA-Z0-9,#.-]+" minLength="4" maxLength="10"/>
        <p className="errorLog">{resultError}</p>
        <input className="btnBoard" type="submit" name="subNameSond" value="Valider"/>
      </form>
    </div>
  )
}

function GuessAnswer({resultError, answerStape}){
  return(
    <div>
      <form className="stapeboard" onSubmit={answerStape}>
        <h2 className="TitleStape">Votre Question</h2>
        <input className="putSond" type="text" name="ansSond" pattern="[ a-zA-Z0-9,#?.-]+" minLength="4" maxLength="10"/>
        <p className="errorLog">{resultError}</p>
        <input className="btnBoard" type="submit" name="subAnsSond" value="Valider"/>
      </form>
    </div>
  )
}
