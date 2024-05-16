import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteActorsComponent } from './favorite-actors.component';

describe('FavoriteActorsComponent', () => {
  let component: FavoriteActorsComponent;
  let fixture: ComponentFixture<FavoriteActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteActorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
