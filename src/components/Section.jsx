import '../../public/styles.css'
import { useEffect, useState } from 'react'
import getCountries from '../services/getCountries'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const Section = () => {
  const [countries, setContries] = useState([])
  useEffect(() => {
    (async () => {
      setContries(await getCountries())
    })()
  }, [])
  console.log(countries)

  return (
    <section className='appClimate'>
      <Autocomplete
        disablePortal
        id='combo-box-demo'
        options={countries.map(country => country.name.official)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label='Escoge un Pais' />}
      />
    </section>
  )
}

export default Section
