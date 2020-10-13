import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ShowResults from './components/ShowResults'


const App = () => {

  const [filterBy, setFilterBy] = useState('')

  const handleFilterByChange = (event) => {
    setFilterBy(event.target.value)
  }


  return (
    <div>
      find countries
      <input
        value={filterBy}
        onChange={handleFilterByChange}
      />
      <ShowResults />
    </div>
  )
}



export default App;
