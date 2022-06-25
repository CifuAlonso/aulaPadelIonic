import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoLibroPageRoutingModule } from './video-libro-routing.module';

import { VideoLibroPage } from './video-libro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoLibroPageRoutingModule
  ],
  declarations: [VideoLibroPage]
})
export class VideoLibroPageModule {}
