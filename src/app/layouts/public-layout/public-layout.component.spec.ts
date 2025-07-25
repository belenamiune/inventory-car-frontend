import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLayoutComponent } from '@layouts/public-layout/public-layout.component';

describe('PublicLayoutComponent', () => {
  let component: PublicLayoutComponent;
  let fixture: ComponentFixture<PublicLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicLayoutComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
