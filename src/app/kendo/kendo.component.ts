import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { EditorComponent } from '@progress/kendo-angular-editor';

@Component({
  selector: 'app-kendo',
  templateUrl: './kendo.component.html',
  styleUrls: ['./kendo.component.css']
})

export class KendoComponent implements AfterViewChecked  {
    
    
    @ViewChild('editor', { static: true })
    editor: EditorComponent;

    twoWayContent = ""
    newLocation = "end";
    cursorPosition = "contentEnd";
    offset=0;
    currentCursorPosition=0;
    public helperText: string = `Hello! <br>

    <p>
    Can you move the cursor $$CURSOR$$
    </p>

    bye byee!
    `;

    waitingEditorChangeToMoveCursor = false;
    waitingEditorChangeToMoveCursorOriginalLength = -1;

    ngAfterViewChecked(): void {
        if(this.waitingEditorChangeToMoveCursor && this.waitingEditorChangeToMoveCursorOriginalLength !== this.editor.value.length){
            this.waitingEditorChangeToMoveCursor=false;
            this.moveCursor();
        }  
    }

    go(editor: EditorComponent) {
        


        editor.focus();

        console.log(this.newLocation, this.cursorPosition);
        switch (this.newLocation) {
          case "beggining":
            //editor.exec('insertText', { text: this.helperText, from: 0, to: 0 });
            this.twoWayContent = this.helperText + this.twoWayContent;
            break;
          case "end":
            //this.editor.html.insert(this.helperText, true);
            this.twoWayContent = this.twoWayContent + this.helperText;
            break;
          case "cursor":
            this.currentCursorPosition = this.getCaretCharacterOffsetWithin(this.editor.viewMountElement);
            console.log("position before focus:", this.currentCursorPosition);

            editor.exec('insertText', { text: this.helperText });
            break;
        }
        this.waitingEditorChangeToMoveCursorOriginalLength =  this.editor.value.length;
        this.waitingEditorChangeToMoveCursor = true;
      }
    
      moveCursor() {
        switch (this.cursorPosition) {
          case "contentEnd":
            this.setCursorPosition(-1);
            break;
          case "contentStart":
            this.setCursorPosition(0);
            break;
          case "offset":
            this.setCursorAtOffset();
            break;
          case "none":
            break;
        }
      }
    
      replaceAll(editor: EditorComponent) {
        editor.exec('setHTML', this.helperText);
      }
    
      cleanUp() {
          this.twoWayContent = "";
      }

      public setCursorPosition(newCursorPosition: number, removeCursorTags = false) {
        console.log("setCursorPosition original editor value", this.editor.value);
        let maxCursorRange = this.editor.value.replace(/<[^>]*>/g, '\n').length - 1;
        
        if(newCursorPosition === -1){
            newCursorPosition=maxCursorRange;            
        }
        console.log(newCursorPosition, maxCursorRange);
        if (newCursorPosition <= maxCursorRange) {
            let cursor =  this.editor.view.state.selection["$cursor"];
            cursor.pos = newCursorPosition;
            this.editor.focus();
            
        }
        if(removeCursorTags){
            //this.editor.value = this.editor.value.replace("$$CURSOR$$", "");
        }
        
      }


      setCursorAtOffset({ right } = { right: false }) {
        let rawTextEditor =  this.editor.value.replace(/<[^>]*>/g, '\n');
        let rawTextNewContent =  this.helperText.replace(/<[^>]*>/g, '\n');
        let position = this.getCaretCharacterOffsetWithin(this.editor.viewMountElement);
        console.log("position in offset:", this.currentCursorPosition+this.offset)


        
        //this.setCursorPosition(position, true)
    
      }

      getCaretCharacterOffsetWithin(element) {
        var caretOffset = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ( (sel = doc.selection) && sel.type != "Control") {
            var textRange = sel.createRange();
            var preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
    }
    
      
    
      lorem() {
        this.twoWayContent = `<span style="color: red; font-size: 23px;">(12/05/2021)</span><br><br><p>------------------------------ Private Notes ------------------------------</p><br>` +
          `<div>qweryuio</div>` +
          `<div><p>qwer</p><p><span>(12/05/2021)</span>o<br><br>    &nbsp;&nbsp;&nbsp; 4565456456 <<name>> </p></div>` +
          `<span style="color:blue;text-align:center"></span>` +
          `<span><u><i>dshfjka</i></u></span>` +
          `<br>&nbsp; <<lastName>>`;
      }
    
}