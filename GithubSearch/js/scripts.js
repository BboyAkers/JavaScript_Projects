
const searchUser = document.querySelector('.searchUser');
const userCardInfo = document.querySelector('.userInfoCard');

searchUser.addEventListener('click', () =>{
    let usernameInputValue = document.querySelector('.usernameInput').value;
    const xhrRequest = new XMLHttpRequest();

    xhrRequest.open("GET", `https://api.github.com/users/${usernameInputValue}`);
    xhrRequest.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            const response = JSON.parse(this.response);
            userCardInfo.innerHTML = `
                <div>
                    <img src='${response.avatar_url}' height="300"/>
                </div>
                <div class="cardBody">
                    <h1>${response.name}</h1>
                    <h2>${response.login}</h2>
                    <p>${response.bio}</p>
                    <div class="cardRow itemsSpaceBetween">
                        <div class="cardItemInfo">
                            <h4>Public Repos</h4>
                            <p>${response.public_repos}</p>
                        </div>
                        <div class="cardItemInfo">
                            <h4>Followers</h4>
                            <p>${response.followers}</p>
                        </div>
                    </div>
                    <a target="_blank" href="${response.html_url}" class="btn btnBlue">Visit Profile</a>
                </div>
            `
            
        }
    }
    xhrRequest.send();
});