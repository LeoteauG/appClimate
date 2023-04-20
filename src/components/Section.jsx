import '../../public/styles.css'
import { useEffect, useState } from 'react'
import getCountries from '../services/getCountries'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import getCities from '../services/getCities'
import getClimaCity from '../services/getClimaCity'
const Section = () => {
  const [countries, setCountries] = useState([])
  const [pais, setPais] = useState(null)
  const [ciudades, setCiudades] = useState([])
  const [ciudad, setCiudad] = useState(null)

  const [clima, setClima] = useState([])

  const [bandera, setBandera] = useState(false)

  useEffect(() => {
    (async () => {
      if (countries !== []) setCountries(await getCountries())
      if (pais !== null) { setCiudades(await getCities(pais)) }
    })()
  }, [pais])

  if (ciudad !== null) {
    useEffect(() => {
      (async () => {
        setClima(await getClimaCity(ciudad))
      })()
    }, [ciudad])
  }

  const countryHandler = (event, valor) => {
    countries.find(country => {
      if (country.name.common === valor) {
        setBandera(true)
        return setPais(country.cca2)
      }
      return null
    }
    )
  }
  const cityHandler = (event, valor) => {
    ciudades.find(city => {
      if (city.name === valor) {
        return setCiudad(valor)
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
              disablePortal
              onSelect={cityHandler}
              id='combo-box-demo'
              options={ciudades.map(ciudad => ciudad.name)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label='Escoge una Ciudad' />}
            />
          : null
      }
    </section>
  )
}

export default Section
