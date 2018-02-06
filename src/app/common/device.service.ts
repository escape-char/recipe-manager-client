import { Injectable } from '@angular/core';
import {Device}   from './constants';

@Injectable()
export class DeviceService{
  private windowWidth:number;
  constructor(){
    this.windowWidth=(window.innerWidth || document.body.clientWidth);
  }
  isMobile(){
    return this.windowWidth <= Device.MOBILE_WIDTH;
  }
  isTablet(){
    return (this.windowWidth >= Device.MOBILE_WIDTH &&
            this.windowWidth <= Device.TABLET_WIDTH);

  }
  isTouch(){
    return 'ontouchstart' in window;
  }
  isMonitor(){
    return (this.windowWidth >= Device.MONITOR_WIDTH);
  }
}
