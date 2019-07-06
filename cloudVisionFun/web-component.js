class ObjectDetectionCamera extends HTMLElement {
    constructor(){
        super();

    }

    connectedCallback() {
        this.initShadowDom();
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

    
}

customElements.define('object-detection-camera', ObjectDetectionCamera);