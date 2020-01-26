import { CoursesService } from "./courses.service";
import { TestBed } from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { COURSES } from "../../../../server/db-data";
import { Course } from "../model/course";
import { HttpErrorResponse } from "@angular/common/http";


describe('CoursesService',()=>{
  let coursesService: CoursesService,
      httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
      ],
      providers: [
        CoursesService,
      ]
    });
    coursesService = TestBed.get(CoursesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should return all courses', ()=>{
    coursesService.findAllCourses()
      .subscribe(courses=>{
        expect(courses).toBeTruthy('No courses returned');
        expect(courses.length).toBe(12);

        const course = courses.find(course => course.id == 12);

        expect(course.titles.description).toBe('Angular Testing Course');

      });
    const req = httpTestingController.expectOne('/api/courses');

    expect(req.request.method).toEqual('GET');
    req.flush({payload: Object.values(COURSES)});

  });

  it('should save the course data', ()=>{
    const changes: Partial<Course> = {
      titles: {
        description: 'Testing Course'
      }
    };

    coursesService.saveCourse(12, changes).subscribe(course=>{
      expect(course.id).toBe(12);
    });

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.titles.description)
      .toEqual(changes.titles.description);
    req.flush({
      ...COURSES[12],
      ...changes
    })
  });

  it('should give an error while saving a course', ()=>{

    coursesService.saveCourse(12, {}).subscribe(
      () => fail('Remote Server Error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500, 'Internal Server Error');
        expect(error.statusText).toBe('Internal Server Error')
      }
    );

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');
    req.flush('Save Course error', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });

  it('should find a list of lessions', ()=>{

  })

  afterEach(()=>{
    httpTestingController.verify(); // confirm http req only call once
  })
});
