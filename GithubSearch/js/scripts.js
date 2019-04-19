
const searchUser = document.querySelector('.searchUser');
const userCardInfo = document.querySelector('.userInfoCard');

searchUser.addEventListener('click', (e) =>{
    e.preventDefault();
    
    let usernameInputValue = document.querySelector('.usernameInput').value;
    const xhrRequest = new XMLHttpRequest();

    xhrRequest.open("GET", `https://api.github.com/users/${usernameInputValue}`);
    xhrRequest.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            const response = JSON.parse(this.response);
            userCardInfo.innerHTML = `
                <div class="">
                    <img src='${response.avatar_url}' height="300"/>
                </div>
                <div class="cardBody">
                    <h2>${response.name}</h2>
                    <h4>${response.login}</h4>
                    <p>${response.bio}</p>
                    <div class="cardItemInfo">
                        <h5>Public Repos</h5>
                        <p>${response.public_repos}</p>
                    </div>
                    <div class="cardItemInfo">
                        <h5>Followers</h5>
                        <p>${response.followers}</p>
                    </div>
                    <a target="_blank" href="${response.html_url}">Vist Profile</a>
                </div>
            `
            
        }
    }
    xhrRequest.send();
});