import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profilePhotoUrl: string = 'https://via.placeholder.com/40';  // Example image URL
  userName: string = 'kumar';  // Example user name

  constructor() { }

  ngOnInit(): void {
    // You can add logic here to dynamically fetch user data
  }
}
