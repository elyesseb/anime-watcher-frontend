import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEpisodeDetailsComponent } from './home-episode-details.component';

describe('HomeEpisodeDetailsComponent', () => {
  let component: HomeEpisodeDetailsComponent;
  let fixture: ComponentFixture<HomeEpisodeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEpisodeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEpisodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
