import { Component, OnInit } from '@angular/core';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { ComiteTecnicoService } from '../../../services/comite-tecnico.service';

declare var cordova:any;    //global;
declare let window: any;


@Component({
  selector: 'app-comite-pdf',
  templateUrl: './comite-pdf.page.html',
  styleUrls: ['./comite-pdf.page.css'],
})
export class ComitePdfPage implements OnInit {
  content: string;
  
cargando=false;
  constructor(private pdfGenerator: PDFGenerator, private file: File,
    private comiteTecnicoService:ComiteTecnicoService) {
    

 
}

  ngOnInit() {
   //this.downloadInvoice()
  }

  descarga(){
    this.downloadInvoice()
  }
  downloadInvoice() {
    let fileName = "myPdfFile.pdf";
    this.content = document.getElementById('PrintInvoice').innerHTML;

    let options = {
      documentSize: 'A4',
      type: 'share',
      // landscape: 'portrait',
      fileName: 'Order-Invoice.pdf',

    };

    this.pdfGenerator.fromData(this.content, options)
    .then((base64) => { /*
      var contentType = "application/pdf";
      var folderpath = this.file.externalRootDirectory + "Download/"; //you can select other folders
     // this.savebase64AsPDF(folderpath, fileName, base64, contentType);  
       let fichero = this.b64toBlob(base64,'pdf')
       this.comiteTecnicoService.subirComite(fichero,'452');
       */
      console.log('OK', base64);
    }).catch((error) => {
      console.log('error', error);
    });
    /*
    document.addEventListener('deviceready', () => { 
      cordova.plugins.pdf.fromData(this.content, options)
      .then((base64) => {
        console.log('OK', base64);
      }).catch((error) => {
        console.log('error', error);
      });

     })
   */
  }

 async  b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }
    await this.sleep(5000)
  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}
sleep(ms = 0) {
  return new Promise((r) => setTimeout(r, ms));
}


async savebase64AsPDF(folderpath,filename,content,contentType){
  // Convert the base64 string in a Blob
  var DataBlob = this.b64toBlob(content,contentType);
  await this.sleep(5000)
  console.log("Starting to write the file :3");
  
  window.resolveLocalFileSystemURL(folderpath, function(dir:any) {
      console.log("Access to the directory granted succesfully");
      dir.getFile(filename, {create:true}, function(file) {
          console.log("File created succesfully.");
          file.createWriter(function(fileWriter) {
              console.log("Writing content to file");
              fileWriter.write(DataBlob);
          }, function(){
              alert('Unable to save file in path '+ folderpath);
          });
      });
  });
}

}
