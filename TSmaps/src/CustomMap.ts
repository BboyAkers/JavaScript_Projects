export class CustomMap {
  constructor(divClass: string) {
    this.googleMap = new google.maps.Map(document.querySelector(divClass), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    });
  }

  private googleMap: google.maps.Map;
} 