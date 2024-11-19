import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profilePhotoUrl: string = 'https://via.placeholder.com/40';  
  userName: string = 'kumar';  

  constructor() { }

  ngOnInit(): void {
  }
}
