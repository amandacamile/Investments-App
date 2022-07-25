const fetchStocksAPI = async () => {
  try {
    const response = await fetch('https://investmentsapi.herokuapp.com/');
    const results = await response.json();
    return results;
  } catch (error) {
    return null;
  }
};

export default fetchStocksAPI;
