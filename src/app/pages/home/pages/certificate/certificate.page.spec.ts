import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificatePage } from './certificate.page';

describe('CertificatePage', () => {
  let component: CertificatePage;
  let fixture: ComponentFixture<CertificatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CertificatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
