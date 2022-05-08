import React from 'react'
import Loader from "../../Loader/Loader"
class SurveyGuess extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "content": null,
      "exist": null,
      "loader": true
    }
  }
  componentDidMount(){
    console.log("FUCK IS MOUNT");
    function isEmpty(str) {
      return (!str || str.length === 0 );
    }
    let url_survey = this.props.location.pathname
    console.log(url_survey);
    let array_uri = url_survey.split(';')
    let answer_string = array_uri[2]
    if (!isEmpty(answer_string)) {

    let answer_array = answer_string.split("%20")
    let answer = ""
    for (var i = 0; i < answer_array.length; i++) {
          answer += answer_array[i]+" "
    }
    let survey_array = url_survey.split("/")
    let survey = survey_array[2]
    let survey_clean = survey.replaceAll("%20", " ")
    console.log(survey_clean);
    let data_to_send = {
      "call": "exist_survey",
      "survey": survey_clean
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
      console.log("JE SSUIS PAS LAAA");
      if (data.success) {
        this.setState({"content": answer})
        this.setState({"exist": true})
      }else {
        console.log("JE SUIS LAAAAAAAAAA");
        this.setState({"exist": false})
        this.setState({"loader": false})
      }

    })
  }else {
    this.setState({"loader": false})
  }
  }
  render(){
    return(
      <div>
        {this.state.exist ? <SurveyView location={this.props.location} content={this.state.content} /> : <ReturnHome loader={this.state.loader}/>}
      </div>
    )
  }
}
export default SurveyGuess

class SurveyView extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "response_state": false,
      "response_content": [],
      "error": null,
      "result_content": [],
      "yes": [0,"0px",[]],
      "no": [0,"0px",[]],
      "maybe": [0,"0px",[]],
      "show_name": false,
      "show_who": null,
      "message_box": false,
      "loader": true,
      "message_text": null
    }
  }
  rstape_one = (e) => {
    e.preventDefault()
    let stape_value
    let stape_unchecked = 0
    for (var i = 0; i < e.target.length - 1; i++) {
      if (e.target[i].checked) {
        stape_value = e.target[i].value
      }else {
        stape_unchecked += 1
      }
    }
    if (stape_unchecked == 3) {
      this.setState({"error": "Choisissez un champ"})
    }else {
      let n_array = []
      n_array.push(stape_value)
      this.setState({"response_content": n_array})
      this.setState({"response_state": true})
    }
  }
  rstape_two = (e) => {
    e.preventDefault()
    this.setState({"message_box": true})
    function isEmpty(str) {
      return (!str || str.length === 0 );
    }
    let survey_clean
    let url_survey = this.props.location.pathname
    let array_uri = url_survey.split(';')
    let answer_string = array_uri[2]
    if (!isEmpty(answer_string)) {

    let answer_array = answer_string.split("%20")
    let answer = ""
    for (var i = 0; i < answer_array.length; i++) {
          answer += answer_array[i]+" "
    }
    let survey_array = url_survey.split("/")
    let survey = survey_array[2]
    survey_clean = survey.replaceAll("%20", " ")
    }
    let data_to_send = {
      "call": "get_result",
      "type": survey_clean
    }
    console.log(data_to_send);
    //   this.setState({"exist": false})
    fetch('http://woogo-api.victorbarlier.fr/guess.php',{
      method: 'post',
      credentials: 'include',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: Object.entries(data_to_send).map(([k,v])=>{return k+'='+v}).join('&')
    }).then(response => response.json()).then(data =>{
      let check_result = true
      for (var i = 0; i < data.length; i++) {
        if (data[i].name == e.target[0].value) {
            check_result = false
        }
      }
      if (check_result) {
        console.log('LE NOM N"EXISTE PAS');
        let data_to_send = {
          "call": "add_result",
          "result": this.state.response_content[0],
          "name": e.target[0].value,
          "type": survey_clean
        }
        //   this.setState({"exist": false})
        fetch('http://woogo-api.victorbarlier.fr/guess.php',{
          method: 'post',
          credentials: 'include',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: Object.entries(data_to_send).map(([k,v])=>{return k+'='+v}).join('&')
        }).then(response => response.json()).then(data => {
          if (data.success) {
            this.setState({"response_state": false})
            function where_push(here, where, data, nbMax){
              let actual_state = here
              let n_state = []
              let nb_of = actual_state[0] + 1
              let size_of_int = nb_of * 220 / nbMax
              let size_of = size_of_int.toString() + "px"
              let n_name_array = actual_state[2]
              n_name_array.push(data.name)
              n_state.push(nb_of)
              n_state.push(size_of)
              n_state.push(n_name_array)
              return n_state
            }
            if (data_to_send.result == "yes") {
              console.log(where_push(this.state.yes, "yes", data_to_send, this.state.max_result));
              this.setState({"yes": where_push(this.state.yes, "yes", data_to_send, this.state.max_result)})
            }else if (data_to_send.result == "no") {
              this.setState({"no": where_push(this.state.no, "no", data_to_send, this.state.max_result)})
            }else if (data_to_send.result == "maybe") {
              this.setState({"maybe": where_push(this.state.maybe, "maybe", data_to_send, this.state.max_result)})
            }
            this.setState({"message_text": "Votre vote est validé"})
            this.setState({"loader": false})
            this.setState({"response_state": false})
            setTimeout(()=>{
              this.setState({"message_box": false})
              this.setState({"loader": false})
            }, 2000)
          }
        })
      }else {
        this.setState({"message_text": "Le nom existe déjà"})
        this.setState({"loader": false})
        this.setState({"response_state": false})
        setTimeout(()=>{
          this.setState({"message_box": false})
          this.setState({"loader": false})
        }, 2000)
      }
    })
  }
  show_name = (e) => {
    this.setState({"show_name": true})
    for (var i = 0; i < e.nativeEvent.path.length - 2; i++) {
      if (e.nativeEvent.path[i].classList.contains("ResultProgress")) {
        if (e.nativeEvent.path[i].getAttribute("value") == "yes") {
          this.setState({"show_who": this.state.yes[2]})
        }else if (e.nativeEvent.path[i].getAttribute("value") == "no") {
          this.setState({"show_who": this.state.no[2]})
        }else if (e.nativeEvent.path[i].getAttribute("value") == "maybe") {
          this.setState({"show_who": this.state.maybe[2]})
        }
      }
    }
  }
  hide_name = (e) => {
    this.setState({"show_name": false})
  }
  componentDidMount(){
    console.log(' SURVEY Mount');
    // Récupérer tous les resultat du sondage
    function isEmpty(str) {
      return (!str || str.length === 0 );
    }
    let survey_clean
    let url_survey = this.props.location.pathname
    let array_uri = url_survey.split(';')
    let answer_string = array_uri[2]
    if (!isEmpty(answer_string)) {

    let answer_array = answer_string.split("%20")
    let answer = ""
    for (var i = 0; i < answer_array.length; i++) {
          answer += answer_array[i]+" "
    }
    let survey_array = url_survey.split("/")
    let survey = survey_array[2]
    survey_clean = survey.replaceAll("%20", " ")
    }
    console.log(survey_clean);
    let data_to_send = {
      "call": "get_result",
      "type": survey_clean
    }
    console.log(data_to_send);
    //   this.setState({"exist": false})
    fetch('http://woogo-api.victorbarlier.fr/guess.php',{
      method: 'post',
      credentials: 'include',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: Object.entries(data_to_send).map(([k,v])=>{return k+'='+v}).join('&')
    }).then(response => response.json()).then(data => {
      // this.setState({"result_content": data})
      console.log(data);
      if (!isEmpty(data)) {
        console.log("DATA VIDE");
        let yes = []
        let no = []
        let maybe = []
        let yes_array = []
        let no_array = []
        let maybe_array = []
        let yes_name = []
        let no_name = []
        let maybe_name = []
        let nb_result = data.length
        for (var i = 0; i < data.length; i++) {
          if (data[i].result == "yes") {
            yes_array.push(data[i])
            yes_name.push(data[i].name)
          }else if (data[i].result == "no") {
            no_array.push(data[i])
            no_name.push(data[i].name)
          }else if (data[i].result == "maybe") {
            maybe_array.push(data[i])
            maybe_name.push(data[i].name)
          }
        }
        let y_progress_value = yes_array.length * 220 / nb_result
        let y_progress = y_progress_value.toString() + "px"
        let n_progress_value = no_array.length * 220 / nb_result
        let n_progress = n_progress_value.toString() + "px"
        let mb_progress_value = maybe_array.length * 220 / nb_result
        let mb_progress = mb_progress_value.toString() + "px"

        yes.push(yes_array.length)
        yes.push(y_progress)
        yes.push(yes_name)

        no.push(no_array.length)
        no.push(n_progress)
        no.push(no_name)

        maybe.push(maybe_array.length)
        maybe.push(mb_progress)
        maybe.push(maybe_name)
        this.setState({"yes": yes})
        this.setState({"no": no})
        this.setState({"maybe": maybe})
        this.setState({"max_result": nb_result})
      }

    })

  }
  render(){
    return(
      <div className="GuessBoard">
        {this.state.show_name ? <ShowName showWho={this.state.show_who} hideName={this.hide_name}/> : ""}
        {this.state.message_box ? <ResultMessage message={this.state.message_text} loader={this.state.loader} /> : ""}
       <h1 className="logo lgw lwht">WG<span className="fontr">®</span></h1>
       <div className="SurveyBlock">
         <div className="SurveyBox">
           <h1 className="SurveyTitle">{this.props.content}?</h1>
           <div className="GuessBox specm">
             <ResultSurvey showName={this.show_name} yes={this.state.yes} no={this.state.no} maybe={this.state.maybe} result={this.state.result_content}/>
           </div>
           <div className="GuessBox rsrv">
           {this.state.response_state ? <GuestName rstape={this.rstape_two}/> : <GuestVote error={this.state.error} rstape={this.rstape_one} />}
           </div>
         </div>
       </div>
       <p className="copyright cGuess">Copyright WebProvide 2022</p>
      </div>
    )
  }
}
class ResultMessage extends React.Component{
  render(){
    return(
      <div className="ResultMessageContainer">
        <div className="ResultMessageBox">
          {this.props.loader ? <Loader /> : <ResultMessageContent message={this.props.message}/>}
        </div>
      </div>
    )
  }
}

class ResultMessageContent extends React.Component{
  render(){
    return(
      <div className="ResultMessageContent">
        <p>{this.props.message}</p>
      </div>
    )
  }
}
class ShowName extends React.Component{
  render(){
    return(
      <div className="ShowNameBox">
        {this.props.showWho.map((name) => (
          <p className="NameResult" key={name}>
            {name}
          </p>
        ))}
        <div className="btnUP">
          <p onClick={this.props.hideName}>^</p>
        </div>
      </div>
    )
  }
}
class ResultSurvey extends React.Component{
  constructor(props){
    super(props)

  }
  componentDidMount(){
    console.log('RESULT SURVEY MOUNT');
    console.log(this.props.result);
  }
  render(){
    return(
      <div>
        <h2 className="ResultTitle">Résultat</h2>
        <div className="ResultProgress" onClick={this.props.showName} value="yes">
          <div className="ProgressSurveyBord">
            <div className="ProgressSurvey yesway" style={{width: this.props.yes[1]}}></div>
          </div>
          <p>👍</p>
          <div className="nb_result">
            <p>{this.props.yes[0]}</p>
          </div>
        </div>
        <div className="ResultProgress" onClick={this.props.showName} value="no">
          <div className="ProgressSurveyBord">
            <div className="ProgressSurvey noway" style={{width: this.props.no[1]}}></div>
          </div>
          <p>👎</p>
          <div className="nb_result">
            <p>{this.props.no[0]}</p>
          </div>
        </div>
        <div className="ResultProgress" onClick={this.props.showName} value="maybe">
          <div className="ProgressSurveyBord">
            <div className="ProgressSurvey maybe" style={{width: this.props.maybe[1]}}></div>
          </div>
          <p>🤷‍♂️</p>
          <div className="nb_result">
            <p>{this.props.maybe[0]}</p>
          </div>
        </div>
      </div>
    )
  }
}
class GuestName extends React.Component{
  render(){
    return(
      <div>
      <form className="ResultForm" onSubmit={this.props.rstape}>
      <h2 className="ResultTitle">Votre Nom</h2>
        <input className="putSond nsurv" type="text" pattern="[ a-zA-Z0-9,#.-]+" minLength="4" maxLength="10" />
        <div className="validate_survey">
          <input className="btnBoard" value="Valider" type="submit"/>
        </div>
      </form>
      </div>
    )
  }
}
class GuestVote extends React.Component{
  render(){
    return(
      <form onSubmit={this.props.rstape}>
        <label htmlFor="guest_yes" className="radio_guest_survey">
          <input type="radio" name="guest_response" value="yes" id="guest_yes"/>
          <p>Oui</p>
        </label>
        <label htmlFor="guest_no" className="radio_guest_survey">
          <input type="radio" name="guest_response" value="no" id="guest_no"/>
          <p>Non</p>
        </label>
        <label htmlFor="guest_maybe" className="radio_guest_survey">
          <input type="radio" name="guest_response" value="maybe" id="guest_maybe"/>
          <p>Peut être</p>
        </label>
        <div className="sub_guest_survey">
          <p>{this.props.error}</p>
          <input className="btnBoard" type="submit" name="sub_guest_survey" value="Valider"/>
        </div>
      </form>
    )
  }
}
class ReturnHome extends React.Component{
  render(){
    return(
      <div className="GuessBoard">
      <h1 className="logo lgw lwht">WG<span className="fontr">®</span></h1>
      <div className="SurveyBlock">
      <div className="SurveyBox">
      <div className="GuessBox specm flc">
      {this.props.loader ? <Loader /> : <ReturnMessage />}
      </div>
      </div>
      </div>
      <p className="copyright cGuess">Copyright WebProvide 2022</p>
      </div>
    )
  }
}
class ReturnMessage extends React.Component{
  render(){
    return(
      <div>
        <h2 className="ResultTitle">Le Sondage n'existe plus</h2>
      </div>
    )
  }
}
