import {Component, Input,
      Output,
      EventEmitter,
      ViewChild,
      ElementRef,
      AfterViewInit,
      Renderer} from '@angular/core';

@Component({
  selector: 'modify-image',
  styleUrls: ['./modify-image.scss'],
  templateUrl: './modify-image.html'
})
export class ModifyImageComponent {
  @ViewChild('fileInput') fileInput:ElementRef;
  @Input() busy:boolean = false;
  @Input() b64ImageFile:string="";
  fileReader:FileReader=null;

  constructor(private renderer:Renderer){

  }
  ngAfterViewInit(){
    console.log("after view init");
    console.log(this.fileInput);
  }
  onRemoveImage(){
    this.b64ImageFile = null;
  }
  onImportImage(){
    this.fileInput.nativeElement.click();
  }
  onFileLoaded(){
    this.b64ImageFile = this.fileReader.result;
    console.log(this.b64ImageFile);
  }
  onChange($event:any){
    let file:File= $event.target.files[0];
    this.fileReader = new FileReader();

    this.fileReader.addEventListener("load", this.onFileLoaded.bind(this), false);

    if(file){
      this.fileReader.readAsDataURL(file);
    }
    console.log("onChange()");
    console.log(file);

  }
}
