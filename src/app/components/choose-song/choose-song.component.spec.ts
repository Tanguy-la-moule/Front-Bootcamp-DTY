import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSongComponent } from './choose-song.component';

describe('ChooseSongComponent', () => {
  let component: ChooseSongComponent;
  let fixture: ComponentFixture<ChooseSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
