import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoTutorialPageRoutingModule } from './video-tutorial-routing.module';

import { VideoTutorialPage } from './video-tutorial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoTutorialPageRoutingModule
  ],
  declarations: [VideoTutorialPage]
})
export class VideoTutorialPageModule {}
