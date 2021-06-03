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

  public froalaOptions = {
    heightMin: '100%',
    heightMax: '100%',
    enter: FroalaEditor.ENTER_BR,
    htmlUntouched: true,
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
    },
  }

  public inputLineNumber: number = 1;
  public twoWayContent: String = "";
  public helperText: string = `Hello! <br>
  
  <p>
  Can you move the cursor <b data-focus="1">HERE?</b>
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

  replaceAll(){
    this.twoWayContent = this.helperText
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

  setCursor({right}={right:false}){
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

  setCursorRight(){
    this.setCursor({right: true})
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
      this.selectSubElement(element.lastChild, false)
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
}
