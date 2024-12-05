import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  isSidebarOpen = true;
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  

}
