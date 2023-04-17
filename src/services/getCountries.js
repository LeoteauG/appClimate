import { ajax } from '../tools/ajax'

const getCountries = async () => {
  const options = {
    method: 'GET',
    url: 'https://restcountries.com/v3.1/all'
  }
  return await ajax(options)
}

export default getCountries
