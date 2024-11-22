import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  productName: string = '';  // Store the product name
  productCount: number = 0;  // Store the product count
  dashboardData: any[] = [];  // This will hold the data from the 'dashboard' collection

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData(); // Load the dashboard data when the component is initialized
  }

  // Load data from the 'dashboard' collection in Firebase
  loadDashboardData() {
    this.dashboardService.getDashboardData().subscribe(snapshot => {
      this.dashboardData = snapshot.map(doc => {
        const data = doc.payload.doc.data() as any;
        const id = doc.payload.doc.id;
        return { id, ...data }; // Map the data with document ID
      });
    });
  }

  // Add new dashboard data to Firebase
  addDashboardData() {
    if (this.productName && this.productCount > 0) {
      const dashboardData = {
        name: this.productName,  // This can be renamed if needed
        count: this.productCount,  // This can be renamed if needed
        timestamp: new Date()  // Add a timestamp
      };
      this.dashboardService.addDashboardData(dashboardData).then(() => {
        this.clearFields(); // Clear the form fields after adding
        this.loadDashboardData(); // Refresh the data
      });
    } else {
      alert('Please fill in both fields correctly!');
    }
  }

  // Clear the form fields
  clearFields() {
    this.productName = '';
    this.productCount = 0;
  }

  // Delete an entry from the 'dashboard' collection by its ID
  deleteDashboardData(entryId: string) {
    this.dashboardService.deleteDashboardData(entryId).then(() => {
      this.loadDashboardData(); // Refresh the data after deleting
    });
  }
}
