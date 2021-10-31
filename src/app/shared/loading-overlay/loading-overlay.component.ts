import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit {
  @Input() color: string = 'primary';
  @Input() diameter: number = 50;
  constructor() { }

  ngOnInit(): void {
  }

}

