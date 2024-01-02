import './style.css'

interface GithubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  created_at: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  twitter_username: string;
  company: string;
  html_url: string;
}

const githubUserCard = document.querySelector('#githubUserCard') as HTMLDivElement;

const renderTemplate = (data: GithubUser) => {
  const { login, avatar_url, name, bio, created_at, public_repos, followers, following, location, blog, twitter_username, company, html_url } = data;
  const html = `
    <div>
      <div class="grid grid-cols-8 md:grid-cols-12">
        <img class="col-span-3 md:col-span-3 rounded-full inline max-h-[150px]" src=${avatar_url}
          alt="Github profile picture" />
        <div class="flex flex-col justify-center inline-block col-span-5 ml-4 md:col-span-9">
          <h2 class="font-semibold md:text-2xl">${name}</h2>
          <a href=${html_url} target="_blank" class="text-blue-500">@${login}</a>
          <p class="text-sm">${created_at}</p>
        </div>
      </div>
      <p class="inline-block mt-8 text-sm">${bio}</p>
      <div class="grid grid-cols-3 p-4 my-6 text-center bg-slate-300 rounded-xl">
        <div>
          <p class="text-sm">Repos</p>
          <p class="font-bold">${public_repos}</p>
        </div>
        <div>
          <p class="text-sm">Followers</p>
          <p class="font-bold">${followers}</p>
        </div>
        <div>
          <p class="text-sm">Following</p>
          <p class="font-bold">${following}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2">
        <p class="mt-3">
          <img src="./src/assets/icon-location.svg" alt="Location point icon" class="inline-block mr-5" />${location ? location : 'Not Available'}
        </p>
        <a href=${blog} target="_blank" class="mt-3">
          <img src="./src/assets/icon-website.svg" alt="Link Icon for website" class="inline-block mr-4" />${blog ? blog : 'Not Available'}
        </a>
        <p class="mt-3">
          <img src="./src/assets/icon-twitter.svg" alt="Twitter/x.com icon"
            class="inline-block mr-4" />${twitter_username ? twitter_username : 'Not Available'}
        </p>
        <p class="mt-3">
          <img src="./src/assets/icon-company.svg" alt="Building icon for company"
            class="inline-block mr-4" />${company ? company : 'Not Available'}
        </p>
      </div>
    </div>
  `;
  githubUserCard.innerHTML = html;
}

const getGithubUserInfo = async () => {
  const formData = new FormData(form);
  const username = formData.get('username');

  if(!username){
    return;
  }
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if(response.ok){
      const data = await response.json();
      return renderTemplate(data);
    }
    githubUserCard.innerHTML = 'User not found';
  }
  catch(err) {
    console.error('Error:', err)
  }
}

const form = document.querySelector("#githubUsername");
form!.addEventListener('submit', (event) => {
  event.preventDefault();
  getGithubUserInfo();
})





