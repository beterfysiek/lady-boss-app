import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImgService {
  public img: boolean;
  public profile_url: string | any;

  constructor(
    private camera: Camera,
  ) {

  }

  public takePicture(): Promise<any> {

    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 600,
      targetHeight: 600,
      saveToPhotoAlbum: true

    }

    return this.camera.getPicture(options);
  }

  library(): Promise<any> {

    const options: CameraOptions = {

      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 75,
      targetWidth: 600,
      targetHeight: 600,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,

    }
    return this.camera.getPicture(options);
  }

}
