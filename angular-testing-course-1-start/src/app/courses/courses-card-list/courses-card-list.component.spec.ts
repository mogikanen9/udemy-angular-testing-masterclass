import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';
import { COURSES } from '../../../../server/db-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { sortCoursesBySeqNo } from '../home/sort-course-by-seq';
import { Course } from '../model/course';
import { setupCourses } from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  let sut: CoursesCardListComponent;

  let fixture: ComponentFixture<CoursesCardListComponent>;

  let el: DebugElement;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule]
    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(CoursesCardListComponent);

      sut = fixture.componentInstance;

      el = fixture.debugElement;
    });
  }));

  it('should create the component', () => {

    expect(sut).toBeTruthy();

  });


  it('should display the course list', () => {

    sut.courses = setupCourses();
    fixture.detectChanges();

    const cards = el.queryAll(By.css('.course-card'));
    expect(cards).toBeTruthy('Could not find cards');
    expect(cards.length).toBe(12,'Unexpected number fo courses');

  });


  it('should display the first course', () => {

    sut.courses = setupCourses();
    fixture.detectChanges();

    const course = sut.courses[0];
    const card = el.query(By.css('.course-card:first-child'));
    expect(card).toBeTruthy('could not find course card');

     const title = card.query(By.css('mat-card-title'));
     expect(title.nativeElement.textContent).toBeTruthy();
     expect(title.nativeElement.textContent).toBe(course.titles.description);

     const img = card.query(By.css('img'));
     expect(img).toBeTruthy();
     expect(img.nativeElement.src).toBe(course.iconUrl,'url of img doesnot match');

  });


});


