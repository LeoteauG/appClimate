import { ajax } from '../tools/ajax'

const getClimaCity = (nameCity) => {
  const options = {
    method: 'GET',
    url: 'https://api.openweathermap.org/data/2.5/weather',
    params: {
      q: nameCity,
      appid: '083713cba91b0ba375f64d88f67e39e0',
      units: 'metric'
    }
  }// https://api.openweathermap.org/data/2.5/weather?&id=&appid=083713cba91b0ba375f64d88f67e39e0
  ajax(options)
}

export default getClimaCity
