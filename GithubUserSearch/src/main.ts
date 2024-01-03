import DOMPurify from 'dompurify';
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
const errorMessage = document.querySelector('#errorMessage') as HTMLDivElement;
const loading = document.querySelector('#loading') as HTMLDivElement;
const initialMessage = document.querySelector('#initialMessage') as HTMLDivElement;
const themeToggleButton = document.querySelector('#themeToggleButton') as HTMLButtonElement;

themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggleButton.childNodes[1].textContent = document.body.classList.contains('dark') ? 'Light' : 'Dark';
  // @ts-ignore
  themeToggleButton.childNodes[3].src = document.body.classList.contains('dark') ? 'https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/65039011-9dbc-407d-b804-43fdceffa800/public' : 'https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/d2b6ea90-c9cc-492d-108a-7c97152d7100/public';
  themeToggleButton.classList.toggle('text-white');
})

const renderTemplate = (data: GithubUser) => {
  const { login, avatar_url, name, bio, created_at, public_repos, followers, following, location, blog, twitter_username, company, html_url } = data;
  const accountCreationDate = new Date(created_at);

  const html = `
    <div>
      <div class="grid grid-cols-8 md:grid-cols-12">
        <img class="col-span-3 md:col-span-3 rounded-full inline max-h-[100px] md:max-h-[150px]" src=${avatar_url}
          alt="Github profile picture" />
        <div class="flex flex-col justify-center col-span-5 ml-2 md:ml-8 md:col-span-9">
          <h2 class="font-semibold text-gray-dark dark:text-white-light md:text-2xl">${name}</h2>
          <a href=${html_url} target="_blank" class="text-blue-500">@${login}</a>
          <p class="text-sm">Joined ${accountCreationDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric'})}</p>
        </div>
      </div>
      <p class="inline-block mt-8 text-sm">${bio}</p>
      <div class="grid grid-cols-3 px-2 py-4 my-6 text-center bg-white-dark dark:bg-navyBlue rounded-xl">
        <div>
          <p class="text-sm text-blue dark:text-white-light">Repos</p>
          <p class="font-bold text-gray-dark dark:text-white-light">${public_repos}</p>
        </div>
        <div>
          <p class="text-sm text-blue dark:text-white-light">Followers</p>
          <p class="font-bold text-gray-dark dark:text-white-light">${followers}</p>
        </div>
        <div>
          <p class="text-sm text-blue dark:text-white-light">Following</p>
          <p class="font-bold text-gray-dark dark:text-white-light">${following}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 text-sm">
        <div>
          <p class="mt-3">
            <img src="https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/93c14a4f-2304-41d5-5c82-f1106df08600/public" alt="Location point icon" class="inline-block mr-5" />${location ? location : 'Not Available'}
          </p>
          <a href=${blog} target="_blank" class="mt-3 block hover:underline">
            <img src="https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/e7153a57-56da-45d3-3f00-5cfc2a1fdd00/public" alt="Link Icon for website" class="inline-block mr-4" />${blog ? blog : 'Not Available'}
          </a>
        </div>
        <div>
          <p class="mt-3">
            <img src="https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/1455261b-d72c-4bb1-2389-401536ac8d00/public" alt="Twitter/x.com icon"
              class="inline-block mr-4" />${twitter_username ? `@${twitter_username}` : 'Not Available'}
          </p>
          <p class="mt-3">
            <img src="https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/aee7aad6-5a36-44a0-72b1-e79666c90700/public" alt="Building icon for company"
              class="inline-block mr-4" />${company ? company : 'Not Available'}
          </p>
        </div>
      </div>
    </div>
  `;
  const cleanHTML = DOMPurify.sanitize(html);
  githubUserCard.innerHTML = cleanHTML;
}

const getGithubUserInfo = async () => {
  const formData = new FormData(form);
  const username = formData.get('username');
  
  errorMessage.classList.add('hidden');
  loading.classList.remove('hidden');
  initialMessage.classList.add('hidden');
  
  if(!username){
    return;
  }
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if(response.ok){
      const data = await response.json();
      renderTemplate(data);
      loading.classList.add('hidden');
      return;
    }
    loading.classList.add('hidden');
    errorMessage.classList.remove('hidden');
  }
  catch(err) {
    loading.classList.add('hidden');
    console.error('Error:', err)
  }
}

const form = document.querySelector("#githubUsername")! as HTMLFormElement;
form!.addEventListener('submit', (event) => {
  event.preventDefault();
  getGithubUserInfo();
})





