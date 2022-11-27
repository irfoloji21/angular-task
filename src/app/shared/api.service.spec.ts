import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";

describe('api service', () => {
  let apiService: ApiService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
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
    const dummyData = [
      {
        "@id": "/advertisers/1",
        "@type": "Advertiser",
        "id": 1,
        "name": "Fiat",
        "orgurl": "http://www.fiat.co.uk/",
        "firstName": "John",
        "lastName": "Smith",
        "email": "info@fiat.co.uk",
        "telephone": "02012345678",
        "updatedTs": "2017-08-07T14:36:49+00:00",
        "address": "/addresses/1"
      },
      {
        "@id": "/advertisers/2",
        "@type": "Advertiser",
        "id": 2,
        "name": "Mercedes-Benz",
        "orgurl": "http://www.mercedes-benz.co.uk/",
        "firstName": "Jim",
        "lastName": "Hendrix",
        "email": "info@mercedes-benz.co.uk",
        "telephone": "02012345678",
        "updatedTs": "2017-08-08T14:36:49+00:00",
        "address": "/addresses/2"
      },
      {
        "@id": "/advertisers/3",
        "@type": "Advertiser",
        "id": 3,
        "name": "Microsoft",
        "orgurl": "http://www.microsoft.co.uk/",
        "firstName": "John",
        "lastName": "Snow",
        "email": "info@microsoft.co.uk",
        "telephone": "02012345678",
        "updatedTs": "2017-08-09T14:36:49+00:00",
        "address": "/addresses/3"
      },
      {
        "@id": "/advertisers/4",
        "@type": "Advertiser",
        "id": 4,
        "name": "Apple",
        "orgurl": "http://www.apple.com/uk/",
        "firstName": "Tyrion",
        "lastName": "Lannister",
        "email": "info@apple.com",
        "telephone": "02012345678",
        "updatedTs": "2017-08-09T14:36:49+00:00",
        "address": "/addresses/4"
      },
      {
        "@id": "/advertisers/5",
        "@type": "Advertiser",
        "id": 5,
        "name": "Nike",
        "orgurl": "http://www.nike.com/uk/",
        "firstName": "John",
        "lastName": "Snow",
        "email": "info@nike.co.uk",
        "telephone": "02012345678",
        "updatedTs": "2017-08-09T14:36:49+00:00",
        "address": "/addresses/5"
      },
      {
        "name": "Mese Education",
        "orgurl": "2222222222",
        "firstName": "mahmut",
        "lastName": "mese",
        "email": "1qlradrvkxicwhenanukz@niwghx.online",
        "telephone": "02222222333",
        "updatedTs": "2022-11-25T17:36:58.936Z",
        "address": "/addresses/6",
        "city": "2222222333",
        "postCode": "ddsd",
        "id": 6,
        "@id": "/advertisers/6",
        "@type": "advertisers"
      },
      {
        "name": "Mese Educationdd",
        "orgurl": "2222222111",
        "firstName": "mahmut",
        "lastName": "mese",
        "email": "1qlradrvkxicwhenanukz@niwghx.online",
        "telephone": "02222222333",
        "updatedTs": "2022-11-25T18:04:27.150Z",
        "address": "/addresses/7",
        "city": "ddd",
        "postCode": "ddd",
        "id": 7,
        "@id": "/advertisers/7",
        "@type": "advertisers"
      },
      {
        "name": "Mese Education",
        "orgurl": "2222222111",
        "firstName": "mahmut",
        "lastName": "mese",
        "email": "1qlradrvkxicwhenanukz@niwghx.online",
        "telephone": "02222222333",
        "updatedTs": "2022-11-25T18:07:45.482Z",
        "address": "/addresses/8",
        "city": "2222222333",
        "postCode": "111",
        "id": 8,
        "@id": "/advertisers/8",
        "@type": "advertisers"
      }
    ];
    apiService.Getallcompany().subscribe(data => {
      expect(data).toEqual(dummyData);
    });
    const req = httpController.expectOne(apiService.apiurl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should get company by code', () => {
    const emsg = 'deliberate 404 error';
    const dummyData = [
      {
        "id": 1,
        "companyName": "company1",
        "companyCode": "company1",
        "companyAddress": "address1",
        "companyPhone": "123456789",
        "companyEmail": "wer@ere.fr",
        "companyWebsite": "www.ere.fr",

      }
    ];
    apiService.GetCompanybycode(1).subscribe(data => {
      expect(data).toEqual(dummyData);
    });
    const req = httpController.expectOne(apiService.apiurl + '/' + 1);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should create company', () => {
    const dummyData = [
      {
        "id": 1,
        "companyName": "company1",
        "companyCode": "company1",
        "companyAddress": "address1",
        "companyPhone": "123456789",
        "companyEmail": "das.ert.tr",
        "companyWebsite": "www.ert.tr",

      }
    ];
    apiService.CreateCompany(dummyData).subscribe(data => {
      expect(data).toEqual(dummyData);
    });
    const req = httpController.expectOne(apiService.apiurl);
    expect(req.request.method).toBe('POST');
    req.flush(dummyData);  
  });
  
  it('should delete company', () => {
      const dummyData = [
        {
          "id": 1,
          "companyName": "company1",
          "companyCode": "company1",
          "companyAddress": "address1",
          "companyPhone": "123456789",
          "companyEmail": "das.ert.tr",
          "companyWebsite": "www.ert.tr",
          
        }
      ];
      apiService.RemoveCompanybycode(1).subscribe(data => {
        expect(data).toEqual(dummyData);
      });
      const req = httpController.expectOne(apiService.apiurl + '/' + 1);
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyData);
  });

  it('should update company', () => {
    const dummyData = [
      {
        "id": 1,
        "companyName": "company1",
        "companyCode": "company1",
        "companyAddress": "address1",
        "companyPhone": "123456789",
        "companyEmail": "das.ert.tr",
        "companyWebsite": "www.ert.tr",

      }
    ];
    apiService.UpdateCompany(1, dummyData).subscribe(data => {
      expect(data).toEqual(dummyData);
    });
    const req = httpController.expectOne(apiService.apiurl + '/' + 1);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyData);
  });
  
});