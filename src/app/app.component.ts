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
  
  // TODO: test with text typed into the editor (type something, extract that text, insert it again, does it looks the same? is it changed in any way?)

  my_text = [
    `<span style="color: red; font-size: 23px;">(12/05/2021)</span><br><br><p>------------------------------ Private Notes ------------------------------</p><br>`,
    `<div>qweryuio</div>`,
    `<div><p>qwer</p><p><span>(12/05/2021)</span>o<br><br>    &nbsp;&nbsp;&nbsp; 4565456456 <<name>> </p></div>`,
    `<span style="color:blue;text-align:center"></span>`,
    `<span><u><i>dshfjka</i></u></span>`,
    `<br>&nbsp; <<lastName>>`
  ]

  test() {
    for(const txt of this.my_text){
      this.helperText = txt;
      this.end();
    }

    alert(this.twoWayContent === this.my_text.join('') ? 'worky worky C:' : 'no worky worky :C');
  }

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
