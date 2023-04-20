import '../../public/styles.css'
import { useEffect, useState } from 'react'
import getCountries from '../services/getCountries'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import getCities from '../services/getCities'
import getClimaCity from '../services/getClimaCity'
// import getClimaCity from '../services/getClimaCity'
const Section = () => {
  const [countries, setContries] = useState([])
  const [ciudad, setCiudad] = useState([])
  const [clima, setClima] = useState([])

  const [bandera, setBandera] = useState(false)

  useEffect(() => {
    (async () => {
      setContries(await getCountries())
    })()
  }, [])

  const countryHandler = (event, valor) => {
    countries.find(async country => {
      if (country.name.common === valor) {
        setBandera(true)
        return setCiudad(await getCities(country.cca2))
      }
      return null
    }
    )
  }
  const cityHandler = (event, valor) => {
    ciudad.find(async city => {
      if (city.name === valor) {
        return setClima(await getClimaCity(city.name))
      }
      return null
    }
    )
  }
  console.log(clima)

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
              onChange={cityHandler}
              disablePortal
              id='combo-box-demo'
              options={ciudad.map(city => city.name)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label='Escoge una Ciudad' />}
            />
          : null
      }
    </section>
  )
}

export default Section
