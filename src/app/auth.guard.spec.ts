import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuth: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(() => {
    // Mock Router and AngularFireAuth
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuth = jasmine.createSpyObj('AngularFireAuth', [], { authState: of(null) }); // Mock the authState getter

    // Provide the mock services
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AngularFireAuth, useValue: mockAuth },
        { provide: Router, useValue: mockRouter }
      ]
    });

    // Instantiate the guard
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the user is authenticated', () => {
    spyOnProperty(mockAuth, 'authState', 'get').and.returnValue(of({}));  

    const route: ActivatedRouteSnapshot = {} as any; 
    const state: RouterStateSnapshot = {} as any; 

    guard.canActivate(route, state).subscribe(result => {
      expect(result).toBeTrue();
    });
  });

  it('should redirect to login if the user is not authenticated', () => {
    spyOnProperty(mockAuth, 'authState', 'get').and.returnValue(of(null));  

    const route: ActivatedRouteSnapshot = {} as any; 
    const state: RouterStateSnapshot = {} as any; 

    guard.canActivate(route, state).subscribe(result => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
