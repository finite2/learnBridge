import {useState} from 'react'

import Deal from '../../classes/Deal'

const useDeal = (init=null) => {
  const [deal, setDeal] = useState(init)

  const fetchDeal = (target) => {
    fetch(target, {headers: {"Content-Type": 'application/json'}})
      .then(response => response.json())
      .then(deal => {
        setDeal(new Deal(deal))
      })
  }

  return [deal, fetchDeal]
}

export default useDeal
