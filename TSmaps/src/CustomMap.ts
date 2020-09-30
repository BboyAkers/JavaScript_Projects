
interface Marker {
  location: {
    lat: number,
    lng: number
  }
}

export class CustomMap {
  private googleMap: google.maps.Map;
  
  constructor(divClass: string) {
    this.googleMap = new google.maps.Map(document.querySelector(divClass), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    });
  }

  addMarker(mappable: Marker): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    })

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: 'Hi there!'
      });

      infoWindow.open(this.googleMap, marker);
    })
  }
} 