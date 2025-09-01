
import "../styles/Card.css"
function Card(props){

  return(
    <div  className = "card-container">
      <img src={props.image} alt="" />
      <div className = "button-container">
        <h2 >{props.name}</h2>
        <button>Explore</button>
      </div>

    
    </div>
  );

}


export default Card;