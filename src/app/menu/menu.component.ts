import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  seccionActual: string;
  descripcionSeccionActual: string;
  constructor() {
    this.seccionActual = 'START';
    this.descripcionSeccionActual = 'INTRODUCTION TO THE SYSTEM';
  }

  ngOnInit() {
  }

}
