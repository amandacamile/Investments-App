const fetchStocksAPI = async () => {
  const result = await fetch('https://investmentsapi.herokuapp.com/')
  const response = result.json();

  return response;

}

export default fetchStocksAPI;