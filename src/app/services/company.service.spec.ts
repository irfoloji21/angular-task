import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CompanyService } from './company.service';
import { HttpClient } from '@angular/common/http';

describe('company service', () => {
  let companyComponent: CompanyService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService],
    });
    companyComponent = TestBed.inject(CompanyService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('getCompanies', () => {
    expect(companyComponent).toBeTruthy();
  });

  it('create company', () => {
    const testData = true;

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
    companyComponent.CreateCompany(dummyData).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });
    const req = httpController.expectOne(companyComponent.apiurlforCompanies);
    expect(req.request.method).toBe('POST');
    req.flush(dummyData);
  });

  it('create address', () => {
    const dummyData = {
      id: 1,
      address: "Convertr Media 6-8, St. John's Square London EC1M 4BH",
      city: 'London',
      postcode: 'EC1M 4BH',
      updatedTs: new Date('2017-08-07T14:36:49+00:00'),
    };
    companyComponent.CreateAddress(dummyData).subscribe((data) => {
      expect(data).toEqual(dummyData);
    });
    const req = httpController.expectOne(companyComponent.apiurlforAddress);
    expect(req.request.method).toBe('POST');
    req.flush(dummyData);
  });
});
