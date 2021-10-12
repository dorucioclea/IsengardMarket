import { Component, OnInit } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public royalties: number;
  public imagePath: string;
  imgURL: any;
  public message: string | undefined;

  constructor(private sanitizer: DomSanitizer) { 
    this.imagePath ='';
    this.royalties = 100;
  }

  ngOnInit(): void {
    console.log(this.ascii_to_hex("ASDASDAS-12bd8a"));
  }

  ascii_to_hex(str: string) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }

  file: string | SafeUrl =
    "assets/images/add-media.png";

  updateImage(ev:any) {
    this.file = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(ev.target.files[0])
    );
  }
}
