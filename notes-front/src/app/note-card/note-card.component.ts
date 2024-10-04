import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements AfterViewInit {

  @Input() title!: string;
  @Input() body!: string;
  @Input() link!: string;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  ngOnInit(){

  }
  ngAfterViewInit() {
    setTimeout(() => {
      let style = window.getComputedStyle(this.bodyText.nativeElement, null);
      let viewableHeight = parseInt(style.getPropertyValue("height"), 10);
  
      if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
        // if there is a text overflow, show the fade out truncator
        this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
      } else {
        // else (there is a text overflow), hide the fade out truncator
        this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
      }
    },100000);
  }
  
  onXButtonClick() {
    this.deleteEvent.emit();
  }
}