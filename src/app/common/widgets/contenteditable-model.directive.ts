import {Directive, ElementRef, Input, Output, EventEmitter, OnChanges} from "@angular/core";

@Directive({
	selector: '[contenteditableModel]',
	host: {
		'(blur)': 'onBlur()',
		'(keyup)': 'onChange()',
		'(focus)': 'onFocus()',
	}
})
export class ContenteditableModel implements OnChanges {
	@Input('contenteditableModelValue') model: any;
	@Input('contenteditableInvalidRegex') regexStr: string;

	@Output('onContenteditableChange') update = new EventEmitter();
  @Output('onContenteditableBlur') blur = new EventEmitter();

	private defaultRegex:string = '[\\^{}\\"\\<\\>\\~\\n\\*\\`\\[\\]#]+';
	private lastViewModel: any;
	private placeholder = "";
	private placeholderClass="";
	private fakeBlur:boolean = false;
	private regex:RegExp;


	constructor(private elRef: ElementRef) {
		this.placeholder = elRef.nativeElement.getAttribute("contenteditablePlaceholder");
		this.placeholderClass = elRef.nativeElement.getAttribute("contenteditablePlaceholderClass");
		console.log("ContenteditableModel");
		console.log(this.model);
		console.log("placeholder");;
		console.log(this.placeholder);
		let r:string = this.regexStr || this.defaultRegex;
		console.log("regex:" + r);
		this.regex = new RegExp(r, 'g');
		if(!this.model || !this.model.content){
			this.elRef.nativeElement.innerText = this.placeholder;
			this.elRef.nativeElement.className += " " + this.placeholderClass;
		}else{
			this.elRef.nativeElement.className.replace(new RegExp(this.placeholderClass, 'g'), '');
		}

	}
	onFocus(){
		console.log("onFocus()");
		if(this.elRef.nativeElement.innerText === this.placeholder &&
		   this.elRef.nativeElement.className.indexOf(this.placeholderClass) !== -1){
				 this.elRef.nativeElement.className = this.elRef.nativeElement.className.replace(new RegExp(this.placeholderClass, 'g'), '');
				 this.elRef.nativeElement.innerText = "";
		}
	}
	onChange(){
		console.log("onChange()");
		let value:string = this.elRef.nativeElement.innerText;
		console.log("this.regex");
		console.log(this.regex);
		value = value.replace(this.regex, "");

		this.model.content= value;
		this.update.emit(value);
		this.refreshView();
	}
	ngOnChanges(changes:any) {
		console.log("ngOnChanges()");
		if (changes.previousValue !== changes.currentValue) {
			this.lastViewModel = this.model.content
			this.refreshView()
      this.update.emit(changes.currentValue)
		}
	}

	onBlur() {
		console.log("onBlur()");
		var value = this.elRef.nativeElement.innerText
		if(!value){
			this.elRef.nativeElement.innerText = this.placeholder;
			this.elRef.nativeElement.className += " " + this.placeholderClass;
			setTimeout(()=>{
				this.blur.emit(value)
			}, 300);
			return;
		}
		this.model.content = value;
		this.lastViewModel = value
		setTimeout(()=>{
			this.blur.emit(value)
			this.refreshView();
		}, 300);
	}
	moveToEnd(c:any){
		let range:any,selection:any;
		var sel = window.getSelection();
		sel.collapse(c.firstChild, this.model.content.length);
}

	private refreshView() {
		this.elRef.nativeElement.innerText  = this.model.content;
		this.moveToEnd(this.elRef.nativeElement);
	}
}
