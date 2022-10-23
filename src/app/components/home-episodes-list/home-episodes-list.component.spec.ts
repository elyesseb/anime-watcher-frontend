import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEpisodesListComponent } from './home-episodes-list';

describe('HomeDetailsEpisodesComponent', () => {
  let component: HomeEpisodesListComponent;
  let fixture: ComponentFixture<HomeEpisodesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEpisodesListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEpisodesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
