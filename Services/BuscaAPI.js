const BuscaAPI = (url, options) => {
  fetch(url, options).then((response) => {
    if (response.ok) {
      console.log(response);
      response.json();
    } else {
      throw new Error('Erro na API');
    }
  })
    .then((data) => data)
    .catch((err) => alert(err));
};

export default BuscaAPI;