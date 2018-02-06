import {Component,
      Input,
      Renderer} from '@angular/core';
import * as _ from "lodash";
@Component({
  selector: 'hour-minute',
  styleUrls: ['./hour-minute.scss'],
  template: `<div class="hm-container">
                <label>{{label}}</label>
                <div class='hm'>
                    <span class='hm-hour'><input name="hour"
                    max="100"
                    min="0"
                    [(ngModel)]="hour" type='number' (ngModelChange)="onHourChanged()">hr</span>
                    <span class='hm-min'><input type='number' name="minute"
                      max="59"
                      min="0"
                      [(ngModel)]="minute" (ngModelChange)="onMinuteChanged()">m</span>
                </div>
             </div>`
})
export class HourMinuteComponent {
  @Input() time:string;
  @Input() label:string;
  public hour:number;
  public minute:number;


  private REGEX = /^([\d]+)hr\s([\d]+)m$/g;

  private MAX_MINUTE:number = 59;
  private MIN_MINUTE:number = 1;
  private DEFAULT_MINUTE:number = 15;
  private DEFAULT_HOUR:number=0;
  private MAX_HOUR:number = 100;

  handleHourChanged(){
    console.log("orig hour");
    console.log(this.hour);
     if(isNaN(this.hour) || this.hour <= 0){
          this.hour = this.DEFAULT_HOUR;
          if(this.minute === 0){
              this.minute = this.MIN_MINUTE;
          }
      }
      else if(this.hour> this.MAX_HOUR){
          this.hour = this.MAX_HOUR;
      }
      this.time = `${this.hour}hr ${this.minute}m`;
  }
  handleMinuteChanged(){
      if(isNaN(this.minute) || this.minute <= 0){
          this.minute = this.MIN_MINUTE;
      }
      else if(this.minute > this.MAX_MINUTE){
          this.minute = this.MAX_MINUTE;
      }
      this.time = `${this.hour}hr ${this.minute}m`;
  }
  onHourChanged(){
     setTimeout(this.handleHourChanged);
  }
  onMinuteChanged(){
    setTimeout(this.handleMinuteChanged);
 }
  constructor(){
      if(this.time){
          let match:any = this.REGEX.exec(this.time);
          this.hour = parseInt(match[0]);
          this.minute = parseInt(match[1]);
      }else{
        this.hour = 0;
        this.minute = this.DEFAULT_MINUTE;
      }
      this.handleHourChanged = _.debounce(this.handleHourChanged, 600).bind(this);
      this.handleMinuteChanged = _.debounce(this.handleMinuteChanged,600).bind(this);
  }
}
