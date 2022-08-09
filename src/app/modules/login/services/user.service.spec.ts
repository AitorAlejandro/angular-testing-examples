import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new UserService(httpClientSpy as any);
  });

  it('should create UserService', () => {
    expect(service).toBeTruthy();
  });

  it('add(3,7) should return 10', () => {
    expect(service.add(3, 7)).toBe(10);
  });

  it('getAll() should return Observable<User[]>', (done: DoneFn) => {
    const mockData = [{ email: 'defaultUser@gmail.com', password: '123' }];

    httpClientSpy.get.and.returnValue(of(mockData));
    service.getAll().subscribe(result => {
      expect(result).toEqual(mockData);
      done();
    });
  });

  it('getAllPlaceholder() should return Observable<PlaceholderUser[]>', (done: DoneFn) => {
    const mockData = [{ email: 'defaultUser@gmail.com', id: 1 }];

    httpClientSpy.get.and.returnValue(of(mockData));
    service.getAllPlaceholder().subscribe(result => {
      expect(result).toEqual(mockData);
      done();
    });
  });

  it('getAllPlaceholder() should return a 401 Unauthorized', (done: DoneFn) => {
    const mockError401 = new HttpErrorResponse({
      error: "Unauthorized user",
      status: 401,
      statusText: 'Unauthorized'
    })

    httpClientSpy.get.and.returnValue(throwError(() => mockError401));
    service.getAllPlaceholder().subscribe({
      error: (error) => {
        expect(error.status).toEqual(401);
        done();
      }
    });
  });

  it('after insert(), getAll() should return new inserted user', (done: DoneFn) => {
    const userToInsert = { email: 'insertedUser@gmail.com', password: '1234' };

    service.insert(userToInsert);
    service.getAll().subscribe(result => {
      expect(result.pop()).toEqual(userToInsert);
      done();
    });
  });
});