import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { GlobalService } from "src/app/services/global.service";
import { Filesystem, Directory } from "@capacitor/filesystem";
/* ES6 */
import * as htmlToImage from 'html-to-image';
import html2canvas from "html2canvas";
import { AuthService } from "src/app/services/auth.service";
import { MyCourseService } from "src/app/services/my-course.service";
import { IMyCourse } from "src/app/model/my.course-model";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-certificate",
  templateUrl: "./certificate.page.html",
  styleUrls: ["./certificate.page.scss"],
})
export class CertificatePage implements OnInit {
  @ViewChild("certificateImg", { static: true })
  certificate!: ElementRef<HTMLImageElement>;
  curse: IMyCourse | undefined;
  get name(): string { return AuthService.user.name; }
  get vNo(): string | undefined { return this.curse?.certificateNo; }
  imageUrl = "https://s3-alpha-sig.figma.com/img/afb7/53d1/0e4ca220494ba9417d820a08063a598f?Expires=1694995200&Signature=EtZNoctAwm7~owN147oVsLQKB8AH4V2KfZyl4bWa8rismCdd~RnBlnSiusy8fXMqpCcNprInGKUAzwHRnTrvZdXjPNmVTmTXiPp2CuRUVCU1B~qVX5GMCBZ6zF9jpEUlVS7-i98uyk3AbYyPJ1ONkVi1rlrH-WvARjLrHjnHijpvw037-Ldia23tJ8a5ZjEa6YOoalBUaKUSiahl1NCRbj8oyLmfp2Z-Vc~lc-FUidAeFTX37nQ1BeqekejRQeeNSv8pUFH6VePimieXYQWE8zzvrByW67x~JJNC3RiO5XwmRi-kjXHKC-uSQBaeNPYlCdjsTpOKOUjSZtSI5oWUjQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";

  constructor(private globalService: GlobalService, private myCourse: MyCourseService, private ac: ActivatedRoute) { }

  async ngOnInit() {
    await Filesystem.requestPermissions();
  }
  async ionViewWillEnter() {
    await this.getInfo();
    console.log(this.curse);
  }

  async getInfo() {
    try {
      const id = this.ac.snapshot.paramMap.get("id");
      console.log(id);

      if (!id) return;
      this.curse = await this.myCourse.getMyCourse(+id);
    } catch (error) { }
  }

  // async downloadCert() {
  //   html2canvas(document.querySelector('#certificateImg')!).then(async (canvas) => {
  //     const result = await this.globalService.writeFile({
  //       data: canvas.toDataURL('image/png'),
  //       path: "certificate.png",
  //     });




  //     // alert(JSON.stringify(result));

  //   })
  //   // const reader = new FileReader();
  //   // let base64data;
  //   // reader.onloadend = () => {
  //   //   base64data = reader.result;
  //   //   console.log(base64data);
  //   // };

  //   // reader.readAsDataURL(image);
  //   // console.log(image);

  // }

  async shareCert() {

    html2canvas(document.querySelector('#certificateImg')!, {
      height: 500
    }).then(async (canvas) => {





      const file = await this.globalService.writeFile({
        path: "cert.png",
        data: canvas.toDataURL(),
        directory: Directory.Cache,
      });
      const result = await this.globalService.share({
        dialogTitle: "Share your Certificate",
        files: [file.uri],
      });

      // alert(JSON.stringify(result));

    })

  }

  async getBase64ImageFromUrl(): Promise<any> {
    var res = await fetch(this.imageUrl);
    var blob = await res.blob();

    var mynode = document.getElementById('image-section');
    if (mynode) {
      return await htmlToImage.toPng(mynode)
    }
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }
}
