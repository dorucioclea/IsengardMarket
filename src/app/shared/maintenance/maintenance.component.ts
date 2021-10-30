import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  public email: string | undefined = undefined;
  public ietCount: number = 100;

  ietValue1 = 0.0001;
  maxIetCount1 = 40000;
  maxIetCount2 = 80000;
  maxIetCount3 = 160000;
  ietValue2 = 0.0002;
  ietValue3 = 0.0004;
  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
  }

  public async subscribe() {
    if (this.email == undefined) {
      alert("Please provide a valid email");
      return;
    }
    const regex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'i');
      if (regex.test(this.email)) {
        this.coreService.addSubscriberEmail(this.email).subscribe(data => {
          alert("Email successfully registered");
        },
          (response) => {
            alert("Email already registered");
            console.error(response.error);
          })
      }else{
        alert("Please provide a valid email");
      }
  }

  public egldValue(ietCount: number){
    return this.ietValue1*ietCount;
  }
}
