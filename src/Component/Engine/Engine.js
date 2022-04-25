import React from "react"

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
      <div>
        <HelloWord />
      </div>
    )
  }
}
export default Engine

function HelloWord(){
  return(
    <p>HelloWord</p>
  )
}
