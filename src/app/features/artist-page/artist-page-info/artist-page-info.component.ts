import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-artist-page-info',
  templateUrl: './artist-page-info.component.html',
  styleUrls: ['./artist-page-info.component.scss']
})

export class ArtistPageInfoComponent implements OnInit {
  @Input() joinedDate: string | undefined;

  constructor (private coreService: CoreService) 
  { 
  }

  ngOnInit() {
  }
}
