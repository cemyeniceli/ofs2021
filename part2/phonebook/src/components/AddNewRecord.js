import React from "react";

const AddNewRecord = ({name, onNameChange, number, onNumberChange, addRecord}) => {
    return(
        <div>
            <h2>add a new</h2>
            <form onSubmit={addRecord}>
                <div>
                    name: <input
                        value={name}
                        onChange={onNameChange}
                    />
                </div>
                <div>
                number: <input
                        value={number}
                        onChange={onNumberChange}
                        />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
  }

  export default AddNewRecord