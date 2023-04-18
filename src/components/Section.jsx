import '../../public/styles.css'
import { useEffect, useState } from 'react'
import getCountries from '../services/getCountries'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import getCities from '../services/getCities'

// import getCities from '../services/getCities'
const Section = () => {
  const [countries, setContries] = useState([])
  const [city, setCity] = useState(null)
  const [ciudad, setCiudad] = useState([])

  useEffect(() => {
    (async () => {
      setContries(await getCountries())
      setCiudad(await getCities(city))
    })()
  }, [city])

  const countryHandler = (event, valor) => {
    const ciudad = countries.find(country => {
      if (country.name.common === valor) {
        return country.cca2
      }
      return null
    }
    )
    setCity(ciudad)
  }

  console.log(ciudad)
  return (
    <section className='appClimate'>
      <Autocomplete
        disablePortal
        id='combo-box-demo'
        onChange={countryHandler}
        options={countries.map(country => country.name.common)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label='Escoge un Pais' />}
      />
    </section>
  )
}

export default Section
