import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom

})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
