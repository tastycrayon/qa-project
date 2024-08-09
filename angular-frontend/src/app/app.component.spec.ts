import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

describe('AppComponent', () => {
  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule, AppComponent],
    }).compileComponents();
    controller = TestBed.inject(ApolloTestingController);
  });
  afterEach(() => {
    controller.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'angular-frontend' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('App');
  });


});
