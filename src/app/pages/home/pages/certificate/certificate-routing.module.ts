import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CertificatePage } from './certificate.page';

const routes: Routes = [
  {
    path: '',
    component: CertificatePage
  },
  {
    path: ':id',
    component: CertificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertificatePageRoutingModule { }
