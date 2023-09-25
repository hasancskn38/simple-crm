import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, onSnapshot, collectionData, docSnapshots, QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  firestore: Firestore = inject(Firestore);
  allUsers: User[] = [];
  userId: any;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const unsub = onSnapshot(this.getUsersRef(), (querySnapshot) => {
      this.allUsers = [];
      querySnapshot.forEach((docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
        const user = new User();
        user.setUserObject(docSnapshot.data());
        // Access the custom ID of the user document
        this.userId = docSnapshot.id;
        this.allUsers.push(user);
      });
    });
  }



  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
