import React from 'react'


const Filter = ({ filterBy, onChange }) => {

  return (
    <div>
      filter by:
      <input
        value={filterBy}
        onChange={onChange}
      />
    </div>
  )
}


export default Filter