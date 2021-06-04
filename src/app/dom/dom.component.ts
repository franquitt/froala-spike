import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dom',
  templateUrl: './dom.component.html',
  styleUrls: ['./dom.component.css']
})
export class DomComponent implements OnInit {

  myControl = new FormControl();
  
  constructor() { }

  ngOnInit(): void {    
  }

  editorControls
  newLocation = "end";
  cursorPosition = "contentEnd";


  private _content: String = "";
  get content(): String {
    return this._content;
  }
  set content(value: String) {
    this._content = value;
  }

  public inputLineNumber: number = 1;
  
  public helperText: string = `Hello! <br>

  <p>
  Can you move the cursor <b data-focus="1">HERE?</b>
  </p>
  `;

  go() {
    console.log(this.newLocation, this.cursorPosition);
    switch (this.newLocation) {
      case "end":
        this.content = this.content + this.helperText;
        console.log(this.content);
        break;
      case "beggining":
        this.content = this.helperText + this.content;
        break;
      case "cursor":
        // this.editor.html.insert(this.helperText);
        break;
    }
    //this.moveCursorOnFroalaRender = true;
  }

  moveCursor() {
    switch (this.cursorPosition) {
      case "contentEnd":
        this.setCursorAtEnd();
        break;
      case "contentStart":
        this.setCursorBeginning();
        break;
      case "markerL":
        this.setCursorAtMark();
        break;
      case "markerR":
        this.setCursorAtMark({ right: true })
        break;
      case "none":
        this.removeCursor();
        break;
    }
  }

  replaceAll() {
    this.content = this.helperText
  }

  cleanUp() {
    this.content = "";
  }

  setCursorAtMark({ right } = { right: false }) {
    // let element: any = this.editorContainer.nativeElement.querySelector(".fr-element");
    // element.focus();

    // // get all elements inside the editor with some style
    // let focuseableElements = element.querySelectorAll("*[data-focus]");

    // // Convert NodeList to an array
    // let elementsArr = Array.prototype.slice.call(focuseableElements);

    // if (!elementsArr || !elementsArr.length)
    //   return

    // // get the dom element with max zIndex
    // const focuseableElement = elementsArr.reduce((prev, current) => (prev.dataset.focus > current.dataset.focus) ? prev : current)

    // if (focuseableElement)
    //   this.selectSubElement(focuseableElement, right)

  }

  setCursorBeginning() {
    // let element: any = this.editorContainer.nativeElement.querySelector(".fr-element");
    // element.focus();
    // if (element.firstChild)
    //   this.selectSubElement(element.firstChild, false)
  }

  setCursorAtEnd() {
    // let element: any = this.editorContainer.nativeElement.querySelector(".fr-element");
    // element.focus();
    // if (element.lastChild)
    //   this.selectSubElement(element.lastChild, true)
  }

  selectSubElement(element, right) {
    let range = document.createRange();
    let selection: any = window.getSelection();
    if (right) {
      range.selectNodeContents(element);
      range.collapse(false);
    } else {
      // Sets selection position to the start of the element.
      range.setStart(element, 0);
    }
    // Removes other selection ranges.
    selection.removeAllRanges();
    // Adds the range to the selection.
    selection.addRange(range);
  }


  removeCursor() {
    // let selection: any = window.getSelection();
    // selection.removeAllRanges();

    // this.editorContainer.nativeElement.blur()
  }

}
