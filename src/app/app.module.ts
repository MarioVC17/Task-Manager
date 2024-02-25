import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TasksManagerComponent } from './pages/tasks-manager/tasks-manager.component';
import { TaksModalComponent } from './components/taks-modal/taks-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { StatusModalComponent } from './components/status-modal/status-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksManagerComponent,
    TaksModalComponent,
    StatusModalComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
