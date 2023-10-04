// eslint-disable-next-line import/no-absolute-path
import '/public/styles.css'
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
  const [clima, setClima] = useState(null)
  const [bandera, setBandera] = useState(false)
  const [fondo, setFondo] = useState('url(images/verano.webp)')

  useEffect(() => {
    (async () => {
      if (countries !== []) setCountries(await getCountries())
      if (pais !== null) { setCiudades(await getCities(pais)) }
    })()
  }, [pais])

  useEffect(() => {
    (async () => {
      setClima(await getClimaCity(ciudad))
    })()
    console.log(clima)
  }, [ciudad])

  useEffect(() => {
    (async () => {
      if (clima.main.temp.toFixed() > 25) {
        setFondo('url(images/verano.webp)')
      } else {
        setFondo('url(images/invierno.webp)')
      }
    })()
  }, [clima])

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
  document.body.style.backgroundImage = fondo

  return (
    <section className='climaApp'>
      <Autocomplete
        className='optionCountry'
        disablePortal
        id='combo-box-demo'
        onChange={countryHandler}
        size='small'
        options={countries.map(country => country.name.common)}
        sx={{ width: '250px' }}
        renderInput={(params) => <TextField {...params} size='small' label='Escoge un Pais' />}
      />
      <br />
      {
        bandera
          ? <Autocomplete
              disablePortal
              onChange={cityHandler}
              value=''
              id='combo-box-demo'
              size='small'
              options={ciudades.map(ciudad => ciudad.name)}
              sx={{ width: '250px' }}
              style={{ borderBottom: '2px solid rgba(159, 159, 159, 0.724)', paddingBottom: '40px' }}
              renderInput={(params) => <TextField {...params} size='small' label='Escoge una Ciudad' />}
            />
          : ''
      }
      {clima && (
        <section className='appClimate'>
          <h1>Detalle</h1>
          <h2>{clima.main.temp.toFixed()}º C</h2>
          <br />
          <h1>Longitud: {clima.coord.lon}</h1>
          <h1>Latitud: {clima.coord.lat}</h1>
          <img src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`} alt='nada aqui' />
          <h2>{clima.weather[0].main}</h2>
        </section>
      )}
    </section>
  )
}

export default Section
