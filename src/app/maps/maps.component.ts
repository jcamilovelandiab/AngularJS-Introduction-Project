import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AskTripServiceService } from '../ask-trip-service.service';
import {LoginComponent} from '../login/login.component';
import { ActivatedRoute, Router } from '@angular/router';

declare const google: any;

/*interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable?: boolean;
}*/
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    public departurePlace;
    public arrivalPlace;
    public rate;
    public passengerEmail = "correo@arsw";

  constructor(private toastr: ToastrService, private askTripService: AskTripServiceService,
        private router: Router) { }
  
  showNotification(from, align){

    const color = Math.floor((Math.random() * 5) + 1);

    this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Thank you for using our service! Your trip is on the way.', '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: 'toast-' + from + '-' +  align
       });
    }
  public addTrip(){
    console.log("EMAIL", this.passengerEmail);
      const trip = {
        'lugarOrigen': this.departurePlace,
        'lugarDestino': this.arrivalPlace,
        'costo': this.rate,
        'correoPasajero': this.passengerEmail
      }
      console.log("TRIP:",trip)
      
      this.askTripService.addTrip(trip).subscribe(response => {
            console.log(response);
            this.router.navigate(['/']);
        });

      this.showNotification('top','center')
  }


  ngOnInit() {
    /*
    var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    var mapOptions = {
        zoom: 13,
        center: myLatlng,
        scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [{
            "featureType": "water",
            "stylers": [{
                "saturation": 43
            }, {
                "lightness": -11
            }, {
                "hue": "#0088ff"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "hue": "#ff0000"
            }, {
                "saturation": -100
            }, {
                "lightness": 99
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#808080"
            }, {
                "lightness": 54
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ece2d9"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ccdca1"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#767676"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#b8cb93"
            }]
        }, {
            "featureType": "poi.park",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.sports_complex",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.medical",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "simplified"
            }]
        }]

    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Hello World!"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);*/
  }

}
