import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  public email: string | undefined;
  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
  }

  public async subscribe() {
    if (this.email != undefined) {
      const regex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'i');
      if (regex.test(this.email)) {
        await this.coreService.addSubscriberEmailAsync(this.email);
        return;
      }
    }
    alert("Please provide a valid email.");
  }
}
