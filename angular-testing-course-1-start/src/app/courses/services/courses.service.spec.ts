import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES } from '../../../../server/db-data';
import { Course } from '../model/course';
import { HttpErrorResponse } from '@angular/common/http';

describe('CourseService', () => {

    let sut: CoursesService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                CoursesService
            ]
        })

        sut = TestBed.inject(CoursesService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should retrieve all courses', () => {
        sut.findAllCourses().subscribe((courses) => {
            expect(courses).toBeTruthy('No courses returned');
            expect(courses.length).toBe(12, 'incorrect number of courses');

            const course = courses.find(c => c.id === 12);
            expect(course.titles.description).toBe('Angular Testing Course');
        });

        const req = httpTestingController.expectOne('/api/courses');
        expect(req.request.method).toEqual('GET');

        req.flush({ payload: Object.values(COURSES) });


    });

    it('should retrieve course by id', () => {
        sut.findCourseById(12).subscribe((course) => {
            expect(course).toBeTruthy('No course is returned');
            expect(course.titles.description).toBe('Angular Testing Course');
        });

        const req = httpTestingController.expectOne('/api/courses/12');
        expect(req.request.method).toEqual('GET');

        req.flush({ payload: Object.values(COURSES[12]) });



    });

    it('should save the changes in the course', () => {

        const updates: Partial<Course> = { titles: { description: 'My Updated Title' } };

        sut.saveCourse(12, updates).subscribe((rs) => {
            expect(rs.id).toBe(12);
        });

        const req = httpTestingController.expectOne('/api/courses/12');
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body.titles.description).toEqual(updates.titles.description);


        req.flush({ ...COURSES[12], ...updates });
    });

    it('should give error when course save fails', () => {

        const updates: Partial<Course> = { titles: { description: 'My Updated Title' } };

        sut.saveCourse(12, updates).subscribe(() => {
            fail('the save course ops should have fail');
        }, (error: HttpErrorResponse) => {
            expect(error.status).toBe(500);
        });

        const req = httpTestingController.expectOne('/api/courses/12');
        expect(req.request.method).toEqual('PUT');
        req.flush('Save course failed', { status: 500, statusText: 'Internal Server Error' });

    });

    afterEach(() => {
        httpTestingController.verify();
    });
});
