import React from "react";
import Person from "./Person";

const RecordList = ({persons}) => {
    return(
      <div>
          <h2>Numbers</h2>
          {persons.map((person) => <Person key={person.id} name={person.name} number={person.number}/>)}
      </div>
    )
}

export default RecordList