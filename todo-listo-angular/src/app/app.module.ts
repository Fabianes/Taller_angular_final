import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiModule } from './ui/ui.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TareaCreadaComponent } from './tarea-creada/tarea-creada.component';
import { TareaEnProcesoComponent } from './tarea-en-proceso/tarea-en-proceso.component';
import { TareaTerminadaComponent } from './tarea-terminada/tarea-terminada.component';

@NgModule({
  declarations: [
    AppComponent,
    TareaCreadaComponent,
    TareaEnProcesoComponent,
    TareaTerminadaComponent
  ],
  imports: [
    BrowserModule,
    UiModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
