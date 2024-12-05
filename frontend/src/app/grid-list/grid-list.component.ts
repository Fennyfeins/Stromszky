import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service.js';
import { Router } from '@angular/router';

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
  isConfirmed: boolean = false;
  

  constructor(
    private authService: AuthService, 
    private router: Router,
  ) {}
  
  logout(): void {
    this.authService.logout();
    this.updateButtonStatus(); 
    console.log('Benutzer wurde ausgeloggt.');
    this.router.navigate(['/login']);
  }

  private updateButtonStatus(): void {
    this.isConfirmed = this.authService.isUserConfirmed();
  }

  ngOnInit(): void {
    this.tiles = [
      {text: 'One', cols: 1, rows: 13, color: 'black'},
      {text: 'Two', cols: 7, rows: 2, color: 'black'},
      {text: 'Three', cols: 7, rows: 11, color: 'black'},
    ];
  }
}
