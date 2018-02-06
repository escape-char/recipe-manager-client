import {Component,
      Input,
      Output,
      EventEmitter,
      ViewChild,
      ElementRef,
      OnDestroy,
      AfterViewInit,
      Renderer} from '@angular/core';
import * as _ from "lodash";
import {DeviceService} from '../../device.service';
import {RecipeDifficulty} from '../../recipes/recipe';


@Component({
  selector: 'difficulty-slider',
  styleUrls: ['./difficulty-slider.scss'],
  templateUrl: './difficulty-slider.html'
})
export class DifficultySliderComponent {
  @ViewChild('slider') slider:ElementRef;
  @Input() difficulty:RecipeDifficulty;

  private DIFFICULT_MARGIN_RIGHT = 30;
  private DEFAULT_HANDLE_X_POS = 6;
  private OVERLAY_DEFAULT_WIDTH = '100%';
  private OVERLAY_DEFAULT_COLOR = '#e0e0e0';
  private OVERLAY_ACTIVE_COLOR = 'darkgray';

  private SMALL_CHOICE_SIZE:number = 20;
  private DEFAULT_CHOICE_SIZE:number = 25;
  private DEFAULT_CHOICE_COLOR:string = '#e0e0e0';

  private CHOICE_MEDIUM_COLOR:string = 'yellow';
  private CHOICE_EASY_COLOR:string = 'green';
  private CHOICE_DIFFICULT_COLOR:string = 'red';


  public handleXPos:number = this.DEFAULT_HANDLE_X_POS;
  public savedXPos:number = 0;
  public mouseDown:boolean = false;

  private sliderHandle:any;

  public  overlayColor:string = this.OVERLAY_DEFAULT_COLOR;
  public overlayWidth:string = "100%";

  public prevOverlayColor:string;
  public prevOverlayWidth:string;

  public easyColor:string = this.DEFAULT_CHOICE_COLOR;
  public mediumColor:string = this.DEFAULT_CHOICE_COLOR;
  public difficultColor:string = this.DEFAULT_CHOICE_COLOR;
  constructor(private renderer:Renderer,
              private deviceService: DeviceService){
      this.onMouseMove = _.debounce(this.onMouseMove, 5);
      this.onTouchMove = _.debounce(this.onTouchMove, 5).bind(this);
      this.onHandleTouchStart = this.onHandleTouchStart.bind(this);
      this.onHandleTouchEnd = this.onHandleTouchEnd.bind(this);

  }
  ngAfterViewInit(){
    this.sliderHandle = this.slider.nativeElement.querySelector('.difficulty-slider-handle')
    if(!this.difficulty){
      setTimeout(()=>{
          this.moveHandleToDifficulty(RecipeDifficulty.EASY);
      });
    }else{
        setTimeout(()=>{
          this.moveHandleToDifficulty(this.difficulty);
        });
    }

    if(this.deviceService.isTouch()){
      this.slider.nativeElement.addEventListener('touchmove', this.onTouchMove);
      this.sliderHandle.addEventListener('touchstart', this.onHandleTouchStart);
      this.sliderHandle.addEventListener('touchend', this.onHandleTouchEnd);
    }
  }
  onHandleTouchStart(e:any){
    console.log("onTouchStart")
    this.onHandleMouseDown(e.changedTouches[0]);
  }
  onHandleTouchEnd(e:any){
    console.log("onTouchEnd")
    this.onHandleMouseUp(e.changedTouches[0]);
  }
  onTouchMove(e:any){
    console.log("onTouchMove");
    this.onMouseMove(e.changedTouches[0]);
  }
  onMouseMove(e:any){
    console.log("onMouseMove");
    if(!this.mouseDown){
      return;
    }
    let x:number = e.clientX;
    let rect:any = this.slider.nativeElement.getBoundingClientRect();

    this.handleXPos = (x - rect.left);

    let easyThreshold = this.handleXPos <= 20;
    let mediumThreshold = this.handleXPos > 20;
    let difficultThreshold = this.handleXPos > ((rect.width/2) + 20);

    console.log("easy threshold: " + easyThreshold);
    console.log("medium threshold: " + mediumThreshold);
    console.log("difficult threshold: " + difficultThreshold);


    if(easyThreshold && !mediumThreshold){
      this.overlayColor = this.OVERLAY_DEFAULT_COLOR;
      this.overlayWidth = this.OVERLAY_DEFAULT_WIDTH;
    }
    else if(mediumThreshold && !difficultThreshold){
      console.log("made medium threeshold");
      this.overlayColor = this.OVERLAY_ACTIVE_COLOR;
      this.overlayWidth = this.handleXPos + 'px';
    }
    else if(difficultThreshold){
      console.log("made difficult threshold");
      this.overlayColor = this.OVERLAY_ACTIVE_COLOR;
      this.overlayWidth = this.handleXPos + 'px';
    }

  }
  onMouseLeave(e:any){
    console.log("onMouseLeave()");
    this.mouseDown=false;
    this.handleXPos = this.savedXPos;
    this.overlayColor = this.prevOverlayColor;
    this.overlayWidth = this.prevOverlayWidth;
  }
  onEasyClicked(e:any){
    console.log("onEasyClicked");
    this.difficulty = RecipeDifficulty.EASY;
    this.moveHandleToDifficulty(RecipeDifficulty.EASY);
  }
  onMediumClicked(e:any){
    console.log("onMediumClicked")
    this.difficulty = RecipeDifficulty.MEDIUM;
    this.moveHandleToDifficulty(RecipeDifficulty.MEDIUM);
  }
  onDifficultClicked(e:any){
    console.log("onDifficultClicked")
    this.difficulty = RecipeDifficulty.DIFFICULT;
    this.moveHandleToDifficulty(RecipeDifficulty.DIFFICULT);
  }
  onLineMouseDown(e:any){
    console.log("OnLineMouseDown()");
  }
  onHandleMouseDown(e:any){
    console.log("onHandleMouseDown()");
    console.log("this.slider");
    console.log(this.slider);
    this.mouseDown = true;
    this.savedXPos = this.handleXPos;
    this.prevOverlayWidth = this.overlayWidth;
    this.prevOverlayColor = this.overlayColor;
  }
  private moveHandleToDifficulty(d:RecipeDifficulty){
    let rect:any = this.slider.nativeElement.getBoundingClientRect();
    let chunkSize:number = rect.width / 4;

    if(d === RecipeDifficulty.EASY){
      this.handleXPos = this.DEFAULT_HANDLE_X_POS;
      this.overlayColor = this.OVERLAY_ACTIVE_COLOR;
      this.overlayWidth = this.handleXPos + 'px';
      this.easyColor = this.CHOICE_EASY_COLOR;
      this.mediumColor = this.difficultColor = this.DEFAULT_CHOICE_COLOR;

    }
    else if(d === RecipeDifficulty.MEDIUM){
      this.handleXPos = rect.width/2;
      this.overlayColor = this.OVERLAY_ACTIVE_COLOR;
      this.overlayWidth = this.handleXPos + 'px';
      this.mediumColor = this.CHOICE_MEDIUM_COLOR;
      this.easyColor = this.difficultColor = this.DEFAULT_CHOICE_COLOR;
    }
    else if(d === RecipeDifficulty.DIFFICULT){
      this.handleXPos = rect.width - this.DIFFICULT_MARGIN_RIGHT;
      this.overlayColor = this.OVERLAY_ACTIVE_COLOR;
      this.overlayWidth = this.handleXPos + 'px';
      this.difficultColor = this.CHOICE_DIFFICULT_COLOR;
      this.easyColor = this.mediumColor = this.DEFAULT_CHOICE_COLOR;
    }
    this.savedXPos = this.handleXPos;
    this.prevOverlayWidth = this.overlayWidth;
    this.prevOverlayColor = this.overlayColor;

  }
  private moveHandleToClosest(){
    let rect:any = this.slider.nativeElement.getBoundingClientRect();
    let chunkSize:number = rect.width / 4;

    let easyThreshold = this.handleXPos < chunkSize;
    let mediumThreshold = this.handleXPos > chunkSize;
    let difficultThreshold = this.handleXPos > (3* chunkSize);

    console.log("easy threshold: " + easyThreshold);
    console.log("medium threshold: " + mediumThreshold);
    console.log("difficult threshold: " + difficultThreshold);

    if(easyThreshold && !mediumThreshold){
      this.handleXPos = this.DEFAULT_HANDLE_X_POS;
      this.overlayColor = this.OVERLAY_DEFAULT_COLOR;
      this.overlayWidth = this.OVERLAY_DEFAULT_WIDTH;

      this.easyColor = this.CHOICE_EASY_COLOR;

      this.mediumColor = this.difficultColor = this.DEFAULT_CHOICE_COLOR;
      this.difficulty = RecipeDifficulty.EASY;
    }
    else if(mediumThreshold && !difficultThreshold){
      console.log("made medium threeshold");
      this.handleXPos = rect.width/2;
      this.overlayColor = this.OVERLAY_ACTIVE_COLOR;
      this.overlayWidth = this.handleXPos + 'px';

      this.mediumColor = this.CHOICE_MEDIUM_COLOR;

      this.easyColor = this.difficultColor = this.DEFAULT_CHOICE_COLOR;
      this.difficulty = RecipeDifficulty.MEDIUM;
    }
    else if(difficultThreshold){
      console.log("made difficult threshold");
      this.handleXPos = rect.width - this.DIFFICULT_MARGIN_RIGHT;
      this.overlayColor = this.OVERLAY_ACTIVE_COLOR;
      this.overlayWidth = this.handleXPos + 'px';

      this.difficultColor = this.CHOICE_DIFFICULT_COLOR;

      this.easyColor = this.mediumColor = this.DEFAULT_CHOICE_COLOR;
      this.difficulty = RecipeDifficulty.DIFFICULT;
    }
  }
  onHandleMouseUp(e:any){
    console.log("onHandleMouseUp()");
    this.mouseDown = false;
    let x:number = e.clientX;
    this.moveHandleToClosest();

    this.savedXPos = this.handleXPos;
    this.prevOverlayWidth = this.overlayWidth;
    this.prevOverlayColor = this.overlayColor;
  }
  ngOnDestroy(){
    if(this.deviceService.isTouch()){
      this.slider.nativeElement.removeEventListener('touchmove', this.onTouchMove);
      this.slider.nativeElement.removeEventListener('touchstart', this.onHandleTouchStart);
      this.slider.nativeElement.removeEventListener('touchend', this.onHandleTouchEnd);
    }
  }
}
