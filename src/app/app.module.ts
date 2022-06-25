import { NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule} from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StarRatingModule } from 'ionic5-star-rating';

import {PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HammerModule } from '@angular/platform-browser';



export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
      'press': { time: 2000 }  //set press delay for 1 second
  }
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    Ng2SearchPipeModule,
    HammerModule,
    StarRatingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [
    Camera,
    FileTransfer,
    PDFGenerator,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }],
  bootstrap: [AppComponent],
})
export class AppModule {}
