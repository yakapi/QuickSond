import React from 'react'
import {Link, useLocation, useParams } from 'react-router-dom'
import Loader from "../../Loader/Loader"

class Guess extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "stape": false,
      "guess_array": [],
      "error": "",
      "result": false,
      "survey_link": null,
      "response_test": false,
      "loader": true
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
      this.setState({"response_test": true})
      // array_final.push(this.state.guess_array[0])
      // array_final.push(e.target[0].value)
      console.log(e.target[0].value);
      let ans = e.target[0].value
      if (e.target[0].value.includes("?")) {
        ans = e.target[0].value.replaceAll("?","")
      }
      let type_exist =  "guest;"+this.state.guess_array[0]+";"+ans
      console.log(type_exist);
      let data_to_send = {
        "call": "exist_survey",
        "survey": type_exist
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
        if (data.success) {
          this.setState({"loader": false})
        }else {
          this.setState({"response_test": false})
          let as = e.target[0].value
          if (e.target[0].value.includes('?')) {
            as = e.target[0].value.replaceAll('?', '')
          }
          let type =  "guest;"+this.state.guess_array[0]+";"+as
          let data_to_send = {
              "call": "add_survey",
              "type": type,
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
                    if (data.success) {
                        let uri = window.location.href
                        let array_uri = uri.split('/')
                        console.log(array_uri);
                        let survey_link = array_uri[0]+"//"+array_uri[2]+"/"+array_uri[3]+"/"+type
                        this.setState({"survey_link": survey_link})
                        this.setState({"result": true})
                      }
                    })
        }
      })

    }
  }
  clipCopy = (e) => {
    navigator.clipboard.writeText(this.state.survey_link)
  }
  render(){
    return(
      <div className="GuessBoard">
      {this.state.response_test ? <TestCreate loader={this.state.loader}/> : ""}
       <h1 className="logo lgw lwht">WG<span className="fontr">®</span></h1>
       <div className="GuessBlock">
        <div className="GuessBox">
          {this.state.result ? <ResultSondage clipCopy={this.clipCopy} surveyLink={this.state.survey_link}/> : this.state.stape ? <GuessAnswer answerStape={this.answerStape} resultError={this.state.error}/> : <GuessName resultError={this.state.error} nameStape={this.nameStape} />}
        </div>
       </div>
       <p className="copyright cGuess">Copyright WebProvide 2022</p>
      </div>
    )
  }
}
export default Guess
class TestCreate extends React.Component{
  render(){
    return(
      <div className="TestCreateContainer">
        <div className="TestCreateBox">
          {this.props.loader ? <Loader/> : <ResultTest/>}
        </div>
      </div>
    )
  }
}
function ResultTest(){
  return(
    <div>
      <p>Le Sondage existe déjà</p>
    </div>
  )
}
function ResultSondage({surveyLink, clipCopy}){
  // const location = useLocation()
  // console.log(location);
  return(
    <div >
      <div className="stapeboard">
        <h2 className="TitleStape">Lien du Sondage</h2>
        <div className="surveyResult">
          <nobr><p>{surveyLink}</p></nobr>
        </div>
        <p className="btnBoard" onClick={clipCopy}>Copier</p>
      </div>
    </div>
  )
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
