import { Component } from '@angular/core';
import FroalaEditor from 'froala-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'froala-spike';


  public twoWayContent: string = "";
  public helperText: string = "dsads";
  
  beginning(){
    this.twoWayContent = this.helperText +this.twoWayContent;
    console.log(this.twoWayContent, this.helperText)
  }
}
