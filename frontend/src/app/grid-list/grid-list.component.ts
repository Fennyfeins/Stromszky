import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit {
  tiles: Tile[] = [];

  constructor() {}

  ngOnInit(): void {
    this.tiles = [
      {text: 'One', cols: 1, rows: 13, color: 'lightblue'},
      {text: 'Two', cols: 7, rows: 2, color: 'lightgreen'},
      {text: 'Three', cols: 7, rows: 11, color: 'lightpink'},
    ];
  }
}
