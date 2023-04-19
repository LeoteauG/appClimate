import '../../public/styles.css'
import { useEffect, useState } from 'react'
import getCountries from '../services/getCountries'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import getCities from '../services/getCities'
// import getClimaCity from '../services/getClimaCity'
const Section = () => {
  const [countries, setContries] = useState([])
  const [city, setCity] = useState(null)
  const [ciudad, setCiudad] = useState([])
  // const [cityClima, setCityClima] = useState([])
  const [bandera, setBandera] = useState(false)

  useEffect(() => {
    (async () => {
      setContries(await getCountries())
      setCiudad(await getCities(city))
    })()
  }, [city])
  // console.log(cityClima)
  const countryHandler = (event, valor) => {
    countries.find(country => {
      if (country.name.common === valor) {
        setBandera(true)
        return setCity(country.cca2)
      }
      return null
    }
    )
  }
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
      <br />
      {
        bandera
          ? <Autocomplete
              key={ciudad.map(city => city.id)}
              disablePortal
              id='combo-box-demo'
              options={ciudad.map(city => city.name).filter(city => city.name)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label='Escoge un Pais' />}
            />
          : null
      }
    </section>
  )
}

export default Section
