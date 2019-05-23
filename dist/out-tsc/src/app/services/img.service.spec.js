import { TestBed } from '@angular/core/testing';
import { ImgService } from './img.service';
describe('ImgService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ImgService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=img.service.spec.js.map