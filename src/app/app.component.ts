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

  public inputLineNumber: number = 1;
  public twoWayContent: String = "";
  public helperText: string = `Hello! <br>
  
  <p>
  Can you move the cursor <b style="z-index: 1" data-focus="1">HERE?</b>
  </p>
  `;
  
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

    alert(this.twoWayContent === this.my_text.join('') ? 'the fields match' : 'the fields don`t match');
  }

  beginning(){
    this.twoWayContent = this.helperText + this.twoWayContent;
    this.setCursor();
  }
  
  end(){
    this.twoWayContent = this.twoWayContent + this.helperText;
    this.setCursor();
  }

  cleanUp(){
    this.twoWayContent="";
  }

  lorem(){
    this.twoWayContent= `<span style="color: red; font-size: 23px;">(12/05/2021)</span><br><br><p>------------------------------ Private Notes ------------------------------</p><br>`+
    `<div>qweryuio</div>`+
    `<div><p>qwer</p><p><span>(12/05/2021)</span>o<br><br>    &nbsp;&nbsp;&nbsp; 4565456456 <<name>> </p></div>`+
    `<span style="color:blue;text-align:center"></span>`+
    `<span><u><i>dshfjka</i></u></span>`+
    `<br>&nbsp; <<lastName>>`;
  }

  setCursor(){
    let element: any = this.editorContainer.nativeElement.querySelector(".fr-element");
    element.focus();

    // get all elements inside the editor with some style
    let focuseableElements = element.querySelectorAll("*[data-focus]");
    
    // Convert NodeList to an array
    let elementsArr = Array.prototype.slice.call(focuseableElements);

    // get the dom element with max zIndex
    const focuseableElement = elementsArr.reduce((prev, current) => (prev.dataset.focus > current.dataset.focus) ? prev : current)
    
    if(focuseableElement)
      this.selectSubElement(focuseableElement)
  }

  
  setCursorBeginning(){
    let element: any = this.editorContainer.nativeElement.querySelector(".fr-element");
    element.focus();
    if(element.firstChild)
      this.selectSubElement(element.firstChild)
  }

  selectSubElement(element){
    let range = document.createRange();
    let selection: any = window.getSelection();

    // Sets selection position to the start of the element.
    range.setStart(element, 0);
    // Removes other selection ranges.
    selection.removeAllRanges();
    // Adds the range to the selection.
    selection.addRange(range);
  }



  //playground
  moveCursor(){
    console.log(this.inputLineNumber);
    console.log(this.twoWayContent);
    const plainText = this.twoWayContent.replace(/<br( \/)*>/g, "\n").replace(/<[^>]*>/g, "");
    const lines = plainText.split("\n");
    console.log(plainText)
    console.log(lines)
    console.log(lines[this.inputLineNumber]);
  }

  //playground
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
    range.setStart(element, 0);
    range.setEnd(element, 1);
    // Removes other selection ranges.
    selection.removeAllRanges();
    // Adds the range to the selection.
    selection.addRange(range);
  }
}
