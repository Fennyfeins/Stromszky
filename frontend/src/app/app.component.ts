import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicService } from'./services/public.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  msg: any;
  constructor(private pService: PublicService) {
    
  }
  ngOnInit(): void{
    this.showMessage();
  }

  showMessage(){
    this.pService.getMessage().subscribe(data=>{
      this.msg = data,
      console.log(this.msg);
    });
  }
}
