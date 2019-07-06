document.addEventListener('DOMContentLoaded', () => {

  const video = document.querySelector('.video');
  const canvas = document.querySelector('.canvas');
  const snapPicture = document.querySelector('.snap');
  const submitPicture = document.querySelector('.submitPicture');
  const itemListContainer = document.querySelector('.itemListContainer');


  let context = canvas.getContext("2d");
  let base64;
  
  // window.addEventListener('DOMContentLoaded', () => {
  //   if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
  //       //video.src = window.URL.createObjectURL(stream);
  //       video.srcObject = stream;
  //       video.play();
  //     });
  //   }
  // });

  snapPicture.addEventListener('click', () => {
    context.drawImage(video, 0, 0, video.width, video.height);

    base64 = canvas.toDataURL();
    base64 = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    return base64;
  });

  submitPicture.addEventListener('click', () => {
    let url = 'https://vision.googleapis.com/v1/images:annotate?key={APIKEY}';
    let data = {
      "requests": [
        {
          "image": {
            "content": base64
          },
          "features": [
            {
              "type": "WEB_DETECTION"
            }
          ]
        }
      ]
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    })
    .then((myJson) => {
      let items = myJson.responses[0].webDetection.webEntities;
      let itemList = '';
      items.forEach(item => {
        if (item.description != null){
          itemList += '<li class="descriptionListItem">' + item.description + '</li>';
        }
      });
      itemListContainer.innerHTML = itemList
    });
  });
});