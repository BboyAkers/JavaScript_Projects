class ObjectDetectionCamera extends HTMLElement {
    constructor(){
        super();

    }

    connectedCallback() {
        this.initShadowDom();
        this.permissionForVideoUse();
    }

    initShadowDom() {
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = this.template;
    }

    get template() {
        return `
        <video class="video" width="400" height="300" autoplay></video>
        <div class="canvas-box"><canvas class="canvas" width="400" height="300"></canvas></div>
        <button class="snap btn btn-primary">Take Photo</button>
        <button class="submitPicture btn btn-success">Submit Picture</button>
        `
    }

    // <---Grabbing Elements
    get videoCanvas(){
        return this.shadowRoot.querySelector('.video');
    }

    get canvas() {
        return this.shadowRoot.querySelector('.canvas');
    }

    get snapPicture() {
        return this.shadowRoot.querySelector('.snap');
    }

    get submitPicture() {
        return this.shadowRoot.querySelector('.submitPicture');
    }

    get itemListContainer() {
        return this.shadowRoot.querySelector('.itemListContainer');
    }
    // Grabbing Elements--->

    permissionForVideoUse() {
        window.addEventListener('DOMContentLoaded', () => {
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                    this.videoCanvas.srcObject = stream;
                    this.videoCanvas.play();
                });
            }
        });
    }

    takePicture() {
        let context = canvas.getContext("2d");

        this.snapPicture.addEventListener('click', () => {
            context.drawImage(video, 0, 0, video.width, video.height);

            base64 = canvas.toDataURL();
            base64 = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
            return base64;    
        });
    }

    
}

customElements.define('object-detection-camera', ObjectDetectionCamera);