import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import FroalaEditor from 'froala-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked{
  

  title = 'froala-spike';

  @ViewChild('froala', {read: ElementRef, static: false}) editorContainer: ElementRef;
  @ViewChild(FroalaEditor, {read: FroalaEditor, static: false}) editorInstance: FroalaEditor;

  editorControls
  newLocation = "beggining";
  cursorPosition = "contentEnd";
  moveCursorOnFroalaRender=false;

  public froalaOptions = {
    heightMin: '100%',
    heightMax: '100%',
    enter: FroalaEditor.ENTER_DIV,
    attribution: false,
    tabSpaces: 5,
    toolbarVisibleWithoutSelection: true,
    charCounterCount: false,
    toolbarInline: false,
    toolbarButtons: {
      moreText: {
        buttons: [
          'bold',
          'italic',
          'underline',
          'clearFormatting',
          'align',
        ]
      },
      moreMisc: {
        buttons: ['undo', 'redo',],
        align: 'right',
        buttonsVisible: 2
      }
    }
  }

  public editor;

  public inputLineNumber: number = 1;
  public twoWayContent: String = "";
  public helperText: string = `Hello! <br>

  <p>
  Can you move the cursor <b data-focus="1">HERE?</b>
  </p>
  `;

  init($event) {
    this.editorControls = $event;
    this.editorControls.initialize();
    this.editor = this.editorControls.getEditor();
  }
  
  ngAfterViewChecked(): void {
    if(this.moveCursorOnFroalaRender){
      this.moveCursorOnFroalaRender=false;
      this.moveCursor();
    }
  }

  go(){
    console.log(this.newLocation, this.cursorPosition);
    switch(this.newLocation){
      case "beggining":
        this.twoWayContent = this.helperText + this.twoWayContent;
        break;
      case "end":
        this.twoWayContent = this.twoWayContent + this.helperText;
        break;
      case "cursor":
        this.editor.html.insert(this.helperText);
        break;
    }
    this.moveCursorOnFroalaRender=true;
  }

  moveCursor(){
    switch(this.cursorPosition){
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
        this.setCursorAtMark({right: true})
        break;
      case "none":
        this.removeCursor();
        break;
    }
  }

  replaceAll(){
    this.twoWayContent = this.helperText
  }

  cleanUp(){
    this.twoWayContent="";
  }

  setCursorAtMark({right}={right:false}){
    let element: any = this.editorContainer.nativeElement.querySelector(".fr-element");
    element.focus();

    // get all elements inside the editor with some style
    let focuseableElements = element.querySelectorAll("*[data-focus]");
    
    // Convert NodeList to an array
    let elementsArr = Array.prototype.slice.call(focuseableElements);

    if(!elementsArr || !elementsArr.length)
      return

    // get the dom element with max zIndex
    const focuseableElement = elementsArr.reduce((prev, current) => (prev.dataset.focus > current.dataset.focus) ? prev : current)
    
    if(focuseableElement)
      this.selectSubElement(focuseableElement, right)
    
  }
  
  setCursorBeginning(){
    let element: any = this.editorContainer.nativeElement.querySelector(".fr-element");
    element.focus();
    if(element.firstChild)
      this.selectSubElement(element.firstChild, false)
  }

  setCursorAtEnd(){
    let element: any = this.editorContainer.nativeElement.querySelector(".fr-element");
    element.focus();
    if(element.lastChild)
      this.selectSubElement(element.lastChild, true)
  }

  selectSubElement(element, right){
    let range = document.createRange();
    let selection: any = window.getSelection();
    if(right){
      range.selectNodeContents(element);
      range.collapse(false);
    }else{
      // Sets selection position to the start of the element.
      range.setStart(element, 0);
    }
    // Removes other selection ranges.
    selection.removeAllRanges();
    // Adds the range to the selection.
    selection.addRange(range);
  }


  removeCursor(){
    let selection: any = window.getSelection();
    selection.removeAllRanges();

    this.editorContainer.nativeElement.blur()
  }

  lorem(){
    this.twoWayContent= `<span style="color: red; font-size: 23px;">(12/05/2021)</span><br><br><p>------------------------------ Private Notes ------------------------------</p><br>`+
    `<div>qweryuio</div>`+
    `<div><p>qwer</p><p><span>(12/05/2021)</span>o<br><br>    &nbsp;&nbsp;&nbsp; 4565456456 <<name>> </p></div>`+
    `<span style="color:blue;text-align:center"></span>`+
    `<span><u><i>dshfjka</i></u></span>`+
    `<br>&nbsp; <<lastName>>`;
  }
}
