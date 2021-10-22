import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  defaultImageUrl = "http://www.rentacarproject.abdulsametozdemir.com/images/default-image.jpg"
  title = 'Deneme';

  constructor(private titleService:Title) {
    this.titleService.setTitle("MotoRentaL");
  }
}
