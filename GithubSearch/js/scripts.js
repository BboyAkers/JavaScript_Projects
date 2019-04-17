
const searchUser = document.querySelector('.searchUser');

searchUser.addEventListener('click', (e) =>{
    e.preventDefault();
    
    let usernameInputValue = document.querySelector('.usernameInput').value;
    const xhrRequest = new XMLHttpRequest();

    xhrRequest.open("GET", `https://api.github.com/users/${usernameInputValue}`);
    xhrRequest.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(this.response)
        }
    }
    xhrRequest.send();
});