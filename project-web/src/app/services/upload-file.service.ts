import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  previewUrl: any = "../../../../assets/images/upload.png";
  fileData: File = null;
  uploadedFilePath: string = null;

  constructor() { }

  // fileProgress(fileInput: any) {
  //   this.fileData = <File>fileInput.target.files[0];
  //   return this.preview();
  // }

  // preview() {
  //   var mimeType = this.fileData.type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return;
  //   }
  //   var reader = new FileReader();
  //   reader.readAsDataURL(this.fileData);
  //   reader.onload = (_event) => {
  //     return this.previewUrl = reader.result;
  //   };
  // }

  // uploadImagem() {
  //   if (this.edit) {
  //     const fileName = this.file[0].name;
  //     this.event.imagemUrl = fileName;
  //     this.eventService.postFile(this.file, this.event.imagemUrl).subscribe();
  //   } else {
  //     const fileName = this.file[0].name;
  //     this.event.imagemUrl = fileName;
  //     this.eventService.postFile(this.file, this.event.imagemUrl).subscribe();
  //   }
  // }
}
