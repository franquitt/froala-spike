import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FroalaComponent } from './froala/froala.component';
import { DomComponent } from './dom/dom.component';
import { ContenteditableModule } from '@ng-stack/contenteditable';

@NgModule({
  declarations: [
    AppComponent,
    FroalaComponent,
    DomComponent,
  ],
  imports: [
    ContenteditableModule,
    FormsModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
