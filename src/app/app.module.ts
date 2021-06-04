import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FroalaComponent } from './froala/froala.component';
import { DomComponent } from './dom/dom.component';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { EditorModule } from '@progress/kendo-angular-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { KendoComponent } from './kendo/kendo.component';




@NgModule({
  declarations: [
    AppComponent,
    FroalaComponent,
    DomComponent,
    KendoComponent
  ],
  imports: [
    ContenteditableModule,
    FormsModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    EditorModule,
    BrowserAnimationsModule,
    TreeViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
