import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  imagem:string = '';

  constructor( private platform: Platform,
               private camera: Camera) {
  }

  tirarFoto() {

    // Testa se a aplicação está sendo executada em um dispositivo
    this.platform.ready().then(()=>{

      // Definições para a imagem capturada
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.imagem = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Trata erros
      });

    });
  }

}

