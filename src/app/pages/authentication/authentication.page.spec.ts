import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationPage } from './authentication.page';

describe('AuthenticationPage', () => {
  let component: AuthenticationPage;
  let fixture: ComponentFixture<AuthenticationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AuthenticationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
