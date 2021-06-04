import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-kendo',
  templateUrl: './kendo.component.html',
  styleUrls: ['./kendo.component.css']
})

export class KendoComponent {
    
    twoWayContent = ""
    newLocation = "end";
    cursorPosition = "contentEnd";
    public helperText: string = "Hello!";

    go() {

        console.log(this.newLocation, this.cursorPosition);
        switch (this.newLocation) {
          case "beggining":
            //this.twoWayContent = this.helperText + this.twoWayContent;
            break;
          case "end":
            //this.editor.html.insert(this.helperText, true);
    //        this.twoWayContent = this.twoWayContent + this.helperText;
            break;
          case "cursor":
            //this.editor.html.insert(this.helperText);
            break;
        }
      }
    
      moveCursor() {
        switch (this.cursorPosition) {
          case "contentEnd":
            break;
          case "contentStart":
            break;
          case "markerL":
            break;
          case "markerR":
            break;
          case "none":
            break;
        }
      }
    
      replaceAll() {
      }
    
      cleanUp() {
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