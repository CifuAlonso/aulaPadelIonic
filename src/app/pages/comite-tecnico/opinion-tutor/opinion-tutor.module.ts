import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpinionTutorPageRoutingModule } from './opinion-tutor-routing.module';

import { OpinionTutorPage } from './opinion-tutor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpinionTutorPageRoutingModule
  ],
  declarations: [OpinionTutorPage]
})
export class OpinionTutorPageModule {}
