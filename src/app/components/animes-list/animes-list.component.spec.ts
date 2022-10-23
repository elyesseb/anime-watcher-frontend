import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimesListComponent } from './animes-list.component';

describe('AnimesListComponent', () => {
  let component: AnimesListComponent;
  let fixture: ComponentFixture<AnimesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
