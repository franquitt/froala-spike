import { Component, ElementRef, ViewChild } from '@angular/core';
import FroalaEditor from 'froala-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'froala-spike';

  @ViewChild('froala', {read: ElementRef, static: false}) editorContainer: ElementRef;

  public twoWayContent: string = "";
  public helperText: string = `<span>(12/05/2021)</span><br><br><p>------------------------------ Private Notes ------------------------------</p><br>`;
  
  beginning(){
    this.twoWayContent = this.helperText + this.twoWayContent;
    this.setCursorAtEnd()
  }
  
  end(){
    this.twoWayContent = this.twoWayContent + this.helperText;
    this.setCursorAtEnd()
  }

  setCursorAtEnd() {
    // Selects the contenteditable element. You may have to change the selector.
    let element: any = this.editorContainer.nativeElement.querySelector(".fr-element");

    // Selects the last and the deepest child of the element.
    while (element.lastChild) {
      element = element.lastChild;
    }

    // Gets length of the element's content.
    let textLength = element.textContent.length;

    let range = document.createRange();
    let selection = window.getSelection();

    // Sets selection position to the end of the element.
    range.setStart(element, textLength);
    range.setEnd(element, textLength);
    // Removes other selection ranges.
    selection.removeAllRanges();
    // Adds the range to the selection.
    selection.addRange(range);
  }
}
