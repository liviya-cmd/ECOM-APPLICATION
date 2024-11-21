import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHeaderAndSidebar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen for router navigation changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Only handle NavigationEnd events
    ).subscribe((event) => {
      // Check if the current route is the login route
      if (this.router.url === '/login') {
        this.showHeaderAndSidebar = false; // Don't show Header & Sidebar on login page
      } else {
        this.showHeaderAndSidebar = true; // Show Header & Sidebar on other pages
      }
    });
  }
}
