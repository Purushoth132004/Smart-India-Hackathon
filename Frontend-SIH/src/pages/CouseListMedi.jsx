import Card from "./Cards.jsx";
import docimage from "../assets/doctor.png"
import bds from "../assets/BDS.png"
import phys from "../assets/phys.png"
import nurse from "../assets/nurse.png"
import phar from "../assets/phamacy.png"
import "../styles/mediCourse.css"

function CourseListMedi(){
  return (<>
     <div>
      <h2>Course Suggestions</h2>
      <hr />
     </div>
     <div className = "card-cum-container">
     <Card  image = {docimage}  name = "MBBS"></Card>
     <Card image = {bds} name = "BDS"></Card>
     <Card image = {phys} name = "Physiotherapy"></Card>
     <Card image = {nurse} name = "Nursing"></Card>
     <Card image = {phar} name = "Pharmacy"></Card>
     </div>
  </>)
}

export default CourseListMedi;

