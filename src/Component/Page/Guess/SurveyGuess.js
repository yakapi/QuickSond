import React from 'react'

class SurveyGuess extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      "content": null
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
    this.setState({"content": answer})
    console.log(answer);
  }
  render(){
    return(
      <div className="GuessBoard">
       <h1 className="logo lgw lwht">WG<span className="fontr">®</span></h1>
       <div className="SurveyBlock">
         <div className="SurveyBox">
           <h1 className="SurveyTitle">{this.state.content}?</h1>
           <div className="GuessBox specm">
             <h2 className="ResultTitle">Résultat</h2>
               <div className="ResultProgress">
                 <div className="ProgressSurveyBord">
                   <div className="ProgressSurvey yesway"></div>
                 </div>
                 <p>👍</p>
               </div>
               <div className="ResultProgress">
                 <div className="ProgressSurveyBord">
                   <div className="ProgressSurvey noway"></div>
                 </div>
                 <p>👎</p>
               </div>
               <div className="ResultProgress">
                 <div className="ProgressSurveyBord">
                   <div className="ProgressSurvey maybe"></div>
                 </div>
                 <p>🤷‍♂️</p>
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
export default SurveyGuess
