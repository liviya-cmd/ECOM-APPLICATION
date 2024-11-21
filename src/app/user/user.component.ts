import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { environment } from '../../environments/environment';

const app = initializeApp(environment.firebase);
const db = getFirestore(app);
const auth = getAuth(app);

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  users: any[] = [];
  isFormVisible: boolean = false;
  passwordError: boolean = false;
  isLoading: boolean = false;
  userToEditId: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.getUsers();
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  // Method to add a new user
  async addUser() {
    if (!this.validatePassword(this.password)) {
      this.passwordError = true;
      return;
    } else {
      this.passwordError = false;
    }

    this.isLoading = true;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
      const user = userCredential.user;

      const docRef = await addDoc(collection(db, 'users'), {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        firebaseUID: user.uid,
      });

      console.log('User added with Firestore ID: ', docRef.id);

      this.users.push({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        firebaseUID: user.uid,
        id: docRef.id,
      });

      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.isFormVisible = false;

      this.isLoading = false;
    } catch (error) {
      console.error('Error adding user: ', error);
      this.isLoading = false;
    }
  }

  // Method to get users from Firestore
  async getUsers() {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      this.users = [];
      querySnapshot.forEach((doc) => {
        this.users.push({ id: doc.id, ...doc.data() });
      });
      console.log('Users fetched:', this.users);
    } catch (error) {
      console.error('Error getting users: ', error);
    }
  }

  // Method to edit a user
  editUser(user: any) {
    this.userToEditId = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = ''; // Do not load the password for security
  }

  // Method to update a user's details
  async updateUser() {
    if (!this.validatePassword(this.password)) {
      this.passwordError = true;
      return;
    } else {
      this.passwordError = false;
    }

    this.isLoading = true;
    try {
      const userDoc = doc(db, 'users', this.userToEditId!);
      await updateDoc(userDoc, {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      });

      // Update the users list
      const index = this.users.findIndex((user) => user.id === this.userToEditId);
      if (index !== -1) {
        this.users[index] = {
          id: this.userToEditId,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          firebaseUID: this.users[index].firebaseUID,
        };
      }

      this.resetForm();
      this.isLoading = false;
    } catch (error) {
      console.error('Error updating user: ', error);
      this.isLoading = false;
    }
  }

  // Method to remove a user
  async removeUser(userId: string) {
    this.isLoading = true;
    try {
      const userDoc = doc(db, 'users', userId);
      await deleteDoc(userDoc);

      // Remove the user from the users list
      this.users = this.users.filter((user) => user.id !== userId);

      this.isLoading = false;
    } catch (error) {
      console.error('Error deleting user: ', error);
      this.isLoading = false;
    }
  }

  // Reset the form fields
  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.userToEditId = null;
    this.isFormVisible = false;
  }
}
