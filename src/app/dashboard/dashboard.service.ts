import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import AngularFirestore
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private firestore: AngularFirestore) { }

  // Get the dashboard data from Firebase Firestore
  getDashboardData(): Observable<any[]> {
    return this.firestore.collection('dashboard').snapshotChanges(); // Access the 'dashboard' collection
  }

  // Add a new entry to the 'dashboard' collection
  addDashboardData(dashboardData: any): Promise<any> {
    return this.firestore.collection('dashboard').add(dashboardData); // Add data to 'dashboard' collection
  }

  // Delete an entry from the 'dashboard' collection by its ID
  deleteDashboardData(entryId: string): Promise<void> {
    return this.firestore.collection('dashboard').doc(entryId).delete(); // Delete by ID from 'dashboard' collection
  }
}
