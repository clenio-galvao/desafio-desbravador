(function() {
  const searchInput = document.getElementById('search-input');
  const userInfo = document.getElementById('user-info');
  const reposInfo = document.getElementById('repos-info');
  const optionOrder = document.getElementById('form-select');
  const urlAPI = 'https://api.github.com/users';
  const clientId = '2c5fee24cb1b8e2214d2';
  const clientSecret = 'ee87f64dfc7b64cd241f37e78b4362502958d9b7';
  let user = '';
  let sort = 'stargazers_count';
  let detailsRepo = {};

  const getUser = async (userName) => {
    const info = await fetch(`${urlAPI}/${userName}?client_id=${clientId}&client_secret=${clientSecret}`)
      .then((resp) => resp.json());

    const repos = await fetch(`${urlAPI}/${userName}/repos?sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
      .then((resp) => resp.json());
    return { info, repos };
  };

  const showUser = (data) => {
    userInfo.innerHTML = `<div class="card m-3" style="width: 18rem;">
    <img src=${data.avatar_url} class="card-img-top" alt="usuario">
    <div class="card-body">
      <h5 class="card-title">${data.login}</h5>
      <p class="card-text">${data.bio}</p>
      <p class="card-text">${data.email}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Seguidores: ${data.followers}</li>
      <li class="list-group-item">Seguidos: ${data.following}</li>
    </ul>
    <div class="card-body">
      <a href=${data.html_url}  class="card-link">Ver no github</a>
    </div>
  </div>`;
  };


  const div = document.getElementById('details');
  if(div) {
    div.innerHTML = `<div class="card text-center">
    <div class="card-header">
      <h5 class="card-title">${detailsRepo.name}</h5>
    </div>
    <div class="card-body">
      <p class="card-text">${detailsRepo.description}</p>
      <p class="card-text">Número de estrelas: ${detailsRepo.stargazers_count}</p>
      <p class="card-text">${detailsRepo.language}</p>
    </div>
    <div class="card-footer">
      <a href="/${detailsRepo.git_url}" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`;
  }

  const showRepos = (repos) => {
    repos.map((repo) => {
      const newRepo = document.createElement('div');

      newRepo.innerHTML = `<div class="card m-3" id="repo">
        <div class="card-body">
          <h6 class="card-title">${repo.name}</h6>
          <a href="/detalhes.html" onCLick={console.log(repo)||${detailsRepo = repo}}>Ver detalhes do repositório</span> //Não consegui fazer as rotas no js vanilla
        </div>
      </div>`;
      return reposInfo.appendChild(newRepo);
    });
  };

  searchInput.addEventListener('keyup', (e) => {
    user = e.target.value;

    getUser(user).then((data) => {
      console.log(data.repos);
      showUser(data.info);
      showRepos(data.repos);
    });
  });

  optionOrder.addEventListener('change', (e) => {
    const repo = document.getElementById('repo');
    if(repo.parentNode) {
      repo.parentNode.removeChild(repo);
    }
    sort = e.target.value;
    getUser(user).then((data) => console.log(data.repos) || showRepos(data.repos));
  });
})();
