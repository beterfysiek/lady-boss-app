import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
var ImgService = /** @class */ (function () {
    function ImgService(camera) {
        this.camera = camera;
    }
    ImgService.prototype.takePicture = function () {
        var options = {
            quality: 75,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: this.camera.EncodingType.JPEG,
            targetWidth: 600,
            targetHeight: 600,
            saveToPhotoAlbum: true
        };
        return this.camera.getPicture(options);
    };
    ImgService.prototype.library = function () {
        var options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 75,
            targetWidth: 600,
            targetHeight: 600,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true,
        };
        return this.camera.getPicture(options);
    };
    ImgService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Camera])
    ], ImgService);
    return ImgService;
}());
export { ImgService };
//# sourceMappingURL=img.service.js.map