import React from "react"
class Loader extends React.Component{
  render(){
    return(
      <div className="Loader">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        <p>Chargement</p>
    </div>
    )
  }
}
export default Loader
