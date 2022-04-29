import React from 'react'

class SurveyGuess extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "content": null,
      "exist": null
    }
  }
  componentDidMount(){
    let url_survey = this.props.location.pathname
    let array_uri = url_survey.split(';')
    let answer_string = array_uri[2]
    let answer_array = answer_string.split("%20")
    let answer = ""
    for (var i = 0; i < answer_array.length; i++) {
          answer += answer_array[i]+" "
    }
    let survey_array = url_survey.split("/")
    let survey = survey_array[2]
    let data_to_send = {
      "call": "exist_survey",
      "survey": survey
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
      // if (data.success) {
      //   this.setState({"content": answer})
      //   this.setState({"exist": true})
      // }else {
      //   this.setState({"exist": false})
      // }
    })
    console.log(answer);
  }
  render(){
    return(
      <div>
        {this.state.exist ? <SurveyView content={this.state.content} /> : <ReturnHome/>}
      </div>
    )
  }
}
export default SurveyGuess

class SurveyView extends React.Component{
  render(){
    return(
      <div className="GuessBoard">
       <h1 className="logo lgw lwht">WG<span className="fontr">®</span></h1>
       <div className="SurveyBlock">
         <div className="SurveyBox">
           <h1 className="SurveyTitle">{this.props.content}?</h1>
           <div className="GuessBox specm">
             <h2 className="ResultTitle">Résultat</h2>
               <div className="ResultProgress">
                 <div className="ProgressSurveyBord">
                   <div className="ProgressSurvey yesway" style={{width: "100px"}}></div>
                 </div>
                  <p>👍</p>
                  <div className="nb_result">
                    <p>15</p>
                  </div>
               </div>
               <div className="ResultProgress">
                 <div className="ProgressSurveyBord">
                   <div className="ProgressSurvey noway"></div>
                 </div>
                 <p>👎</p>
                   <div className="nb_result">
                     <p>15</p>
                   </div>
               </div>
               <div className="ResultProgress">
                 <div className="ProgressSurveyBord">
                   <div className="ProgressSurvey maybe"></div>
                 </div>
                 <p>🤷‍♂️</p>
                   <div className="nb_result">
                     <p>15</p>
                   </div>
               </div>
           </div>
           <div className="GuessBox">
             <form>
               <label htmlFor="guest_yes" className="radio_guest_survey">
                 <input type="radio" name="guest_response" id="guest_yes"/>
                 <p>Oui</p>
               </label>
               <label htmlFor="guest_no" className="radio_guest_survey">
                 <input type="radio" name="guest_response" id="guest_no"/>
                 <p>Non</p>
               </label>
               <label htmlFor="guest_maybe" className="radio_guest_survey">
                 <input type="radio" name="guest_response" id="guest_maybe"/>
                 <p>Peut être</p>
               </label>
               <div className="sub_guest_survey">
                 <input className="btnBoard" type="submit" name="sub_guest_survey" value="Valider"/>
               </div>
             </form>
           </div>
         </div>
       </div>
       <p className="copyright cGuess">Copyright WebProvide 2022</p>
      </div>
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
           <div className="GuessBox specm">
             <h2 className="ResultTitle">Le Sondage n'existe pas</h2>
           </div>
         </div>
       </div>
       <p className="copyright cGuess">Copyright WebProvide 2022</p>
      </div>
    )
  }
}
