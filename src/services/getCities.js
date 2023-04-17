import { ajax } from '../tools/ajax'

const getCities = async (city) => {
  const options = {
    method: 'GET',
    url: 'https://spott.p.rapidapi.com/places/',
    headers: {
      'X-RapidAPI-Key': '2a29d52f3bmsh5bf448a9e6ad8b5p1d7ca6jsnad71635c3128',
      'X-RapidAPI-Host': 'spott.p.rapidapi.com'
    },
    params: {
      limit: 100,
      type: 'CITY',
      country: `${city}`
    }
  }
  return await ajax(options)
}

export default getCities
