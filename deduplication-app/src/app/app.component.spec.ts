import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let deduplicatedExpectation: string[];

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.wordList = ['not', 'a', 'pheasant', 'plucker', 'but', 'a', 'pheasant', "plucker's", 'son'];

    deduplicatedExpectation = [ 'not', 'a', 'pheasant', 'plucker', 'but', "plucker's", 'son' ];
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should deduplicate an array 1'`, () => {
    expect(component.deduplicateMethod1()).toEqual(deduplicatedExpectation)
  });

  it(`should deduplicate an array 2'`, () => {
    expect(component.deduplicateMethod2()).toEqual(deduplicatedExpectation)
  });

  it(`should deduplicate an array 3'`, () => {
    expect(component.deduplicateMethod3()).toEqual(deduplicatedExpectation)
  });
});
