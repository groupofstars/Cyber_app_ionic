import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CertificatePageRoutingModule } from './certificate-routing.module';

import { CertificatePage } from './certificate.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CertificatePageRoutingModule,
    SharedModule
  ],
  declarations: [CertificatePage]
})
export class CertificatePageModule {}
