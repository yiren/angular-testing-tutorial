import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;

  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(async(()=>{ // async這裡不是typescript的language feature，而是testing中的function
    TestBed.configureTestingModule({
      imports: [
        CoursesModule // 如果TDD，那麼就無法事先知道Course Module所有的component以及UI dependency
      ]
    })
      .compileComponents()
      .then(()=>{
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });

  }));

  it("should create the component", () => {

    expect(component).toBeTruthy('Component not created');

  });


  it("should display the course list", () => {

    component.courses = setupCourses();
    // console.log(el.nativeElement.outerHTML);
    fixture.detectChanges();
    // console.log(el.nativeElement.outerHTML);
    const cards = el.queryAll(By.css('.course-card'));
    expect(cards).toBeTruthy('No course cards');
    expect(cards.length).toBe(12, 'incorrect courses number');


  });


  it("should display the first course", () => {

    component.courses = setupCourses();
    // console.log(el.nativeElement.outerHTML);
    fixture.detectChanges();
    // console.log(el.nativeElement.outerHTML);

    const course = component.courses[0];

    const card = el.query(By.css('.course-card:first-child')),
          title = el.query(By.css('mat-card-title')),
          img = el.query(By.css('img'));

    expect(card).toBeTruthy('card not exist');
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(img.nativeElement.src).toBe(course.iconUrl);

  });


});


