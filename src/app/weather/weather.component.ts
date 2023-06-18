import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { IProfile } from '../Profile';
import { ProfileService } from '../profile.service';
import { WeatherService } from '../weather.service';
import { IWeather } from './WeatherInterface';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  input = '';
  data: IWeather = {};
  error = '';
  text = '';
  loading = false;
  display: string | undefined = '';
  displayModal = '';

  constructor(private service: WeatherService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.city.subscribe(res => {
      this.loading = true;
      this.error = '';
      this.data = {};
      this.displayData(res as string);
    })
  }
  onGive() {
    this.error = '';
    this.data = {};
    this.loading = true;
    this.displayData(this.input);   
  }
  displayData(name: string) {
    this.service.updateData(name).subscribe(res => {
      this.loading = false;
      this.data = res;
      console.log(this.data);
      this.display = this.data.current?.condition?.text?.toLowerCase();
      }, err => {
      console.log(err.error.error.message);
      let errorMessage: string = err.error.error.message;
      if (errorMessage.toLowerCase().includes('parameter')) {
        this.error = 'Enter a City';
      } else {
        this.error = errorMessage;
      }
    });
  }

  onAdd(profile: IProfile) {
    this.profileService.addProfile(profile);    
  }

  clicked() {
    this.displayModal = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  close() {
    this.error = '';
    this.loading = false;
    this.displayModal = "none";
  }
}
