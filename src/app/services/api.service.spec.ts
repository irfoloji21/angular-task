import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
const dummyData = {
  '@id': '/advertisers/2',
  '@type': 'Advertiser',
  id: 2,
  name: 'Mercedes-Benz',
  orgurl: 'http://www.mercedes-benz.co.uk/',
  firstName: 'Jim',
  lastName: 'Hendrix',
  email: 'info@mercedes-benz.co.uk',
  telephone: '02012345678',
  updatedTs: new Date('2017-08-08T14:36:49+00:00'),
  address: '/addresses/2',
};
describe('api service', () => {
  let apiService: ApiService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    apiService = TestBed.inject(ApiService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('service created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should get all companies', () => {
    const testData = true;

    apiService.Getallcompany().subscribe((data) => {
      expect(data).toEqual(dummyData);
    });
    const req = httpController.expectOne(apiService.apiurl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should get company by code', () => {
    const emsg = 'deliberate 404 error';
    apiService.GetCompanybycode(1).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });
    const req = httpController.expectOne(apiService.apiurl + '/' + 1);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should create company', () => {
    apiService.CreateCompany(dummyData).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });
    const req = httpController.expectOne(apiService.apiurl);
    expect(req.request.method).toBe('POST');
    req.flush(dummyData);
  });

  it('should delete company', () => {
    apiService.RemoveCompanybycode(1).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });
    const req = httpController.expectOne(apiService.apiurl + '/' + 1);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyData);
  });

  it('should update company', () => {
    apiService.UpdateCompany(1, dummyData).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });
    const req = httpController.expectOne(apiService.apiurl + '/' + 1);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyData);
  });
});
