import { TestBed } from '@angular/core/testing';

import { RemoveProductService } from './remove-product.service';

describe('RemoveProductService', () => {
  let service: RemoveProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
