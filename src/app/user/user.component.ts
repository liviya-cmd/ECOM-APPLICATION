import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth, EmailAuthProvider, reauthenticateWithCredential, updateEmail } from '@firebase/auth'; // Correct import

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
  userId: string | null = null;

  users: { firstName: string, lastName: string, email: string, id: string }[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Load all users from Firestore
  loadUsers() {
    this.firestore.collection('users').get().subscribe(querySnapshot => {
      this.users = [];
      querySnapshot.forEach(doc => {
        const data = doc.data() as { firstName: string, lastName: string, email: string };
        this.users.push({
          ...data,
          id: doc.id
        });
      });
    });
  }

  // Create a new user in Firebase Authentication and Firestore
  createUser() {
    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      alert('Please fill in all fields.');
      return;
    }

    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          const userData = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
          };

          this.firestore.collection('users').doc(user.uid).set(userData)
            .then(() => {
              console.log('User added successfully to Firestore');
              this.loadUsers();
              this.clearFields();
            })
            .catch((error) => {
              console.error('Error saving user to Firestore:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error creating user in Firebase Authentication:', error);
      });
  }

  // Clear the form fields
  clearFields() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.userId = null;
  }

  // Set fields to edit a user
  editUser(user: { firstName: string, lastName: string, email: string, id: string }) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.userId = user.id;
  }

  // Save changes to the user (update user)
  saveUser() {
    if (!this.userId) {
      alert('No user selected for editing');
      return;
    }

    const updatedData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };

    this.firestore.collection('users').doc(this.userId).update(updatedData)
      .then(() => {
        console.log('User data updated successfully in Firestore');

        // Update email in Firebase Authentication only if the current user is being edited
        this.afAuth.currentUser.then(currentUser => {
          if (currentUser && currentUser.uid === this.userId) {
            // Re-authenticate the user to update email
            const credential = EmailAuthProvider.credential(currentUser.email || '', this.password);

            reauthenticateWithCredential(currentUser, credential)
              .then(() => {
                // After successful re-authentication, update the email
                updateEmail(currentUser, this.email)
                  .then(() => {
                    console.log('Email updated successfully in Firebase Authentication');
                  })
                  .catch((error) => {
                    console.error('Error updating email in Firebase Authentication:', error);
                  });
              })
              .catch((error) => {
                console.error('Re-authentication failed:', error);
              });
          } else {
            console.log('The user being edited is not the currently authenticated user.');
          }
        });

        this.loadUsers();
        this.clearFields();
      })
      .catch(error => {
        console.error('Error updating user in Firestore:', error);
      });
  }

  // Delete a user
  deleteUser(userId: string) {
    console.log('Attempting to delete user with ID:', userId);

    this.firestore.collection('users').doc(userId).delete()
      .then(() => {
        console.log('User deleted successfully from Firestore');

        this.afAuth.currentUser.then(currentUser => {
          if (currentUser && currentUser.uid === userId) {
            currentUser.delete()
              .then(() => {
                console.log('User deleted successfully from Firebase Authentication');
              })
              .catch(error => {
                console.error('Error deleting user from Firebase Authentication:', error);
              });
          } else {
            console.log('The user being deleted is not the currently authenticated user.');
          }
        });

        this.loadUsers();
      })
      .catch(error => {
        console.error('Error deleting user from Firestore:', error);
      });
  }
}
