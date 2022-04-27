import React from 'react'

class Guess extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "stape": false,
      "guess_array": [],
      "error": ""
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
  render(){
    return(
      <div className="GuessBoard">
       <h1 className="logo lgw lwht">WG<span className="fontr">®</span></h1>
       <div className="GuessBlock">
        <div className="GuessBox">
          {this.state.stape ? <GuessAnswer resultError={this.state.error}/> : <GuessName resultError={this.state.error} nameStape={this.nameStape} />}
        </div>
       </div>
       <p className="copyright cGuess">Copyright WebProvide 2022</p>
      </div>
    )
  }
}
export default Guess

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

function GuessAnswer({resultError}){
  return(
    <div>
      <form className="stapeboard">
        <h2 className="TitleStape">Votre Question</h2>
        <input className="putSond" type="text" name="ansSond" pattern="[ a-zA-Z0-9,#?.-]+" minLength="4" maxLength="10"/>
        <p className="errorLog">{resultError}</p>
        <input className="btnBoard" type="submit" name="subAnsSond" value="Valider"/>
      </form>
    </div>
  )
}
