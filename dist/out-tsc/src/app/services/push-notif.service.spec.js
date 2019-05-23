import { TestBed } from '@angular/core/testing';
import { PushNotifService } from './push-notif.service';
describe('PushNotifService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(PushNotifService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=push-notif.service.spec.js.map