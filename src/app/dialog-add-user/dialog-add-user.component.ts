import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, setDoc,collectionData } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})

export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  user = new User();
  birthDate!: Date;
  users$;
  users;
  unsubList;
  loading = false;
  userForm: FormGroup;


  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private fb: FormBuilder, private _toastService: ToastService) {

      this.userForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        birthDate: ['', Validators.required],
        street: ['', Validators.required],
        zipCode: ['', Validators.required],
        city: ['', Validators.required]
      });

    this.unsubList = onSnapshot(this.getUsersRef(), (list) => {
      list.forEach(element => {
        // console.log('check');
      });
    }); 

    this.users$ = collectionData(this.getUsersRef());
    this.users = this.users$.subscribe((list) => {
      list.forEach(element => {
        // console.log(element);
      });
    })
  }

  ngOnDestroy() {
    this.unsubList();
    this.users.unsubscribe();
  }

  resetForm() {
    // Reset the user object to an empty state
    this.user = new User(); // You might need to adjust this based on your initial setup
  }
  

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    this._toastService.success(`User added: ${this.user.firstName}`);
    setTimeout(() => {
      setDoc(doc(this.getUsersRef()), this.user.toJSON())
    .then(() => {
      this.loading = false;
      this.resetForm();
      this.dialogRef.close();
    })
    .catch((error) => {
      console.error('error', error);
    });
    }, 1000);
  }

  cancel(){
    this.dialogRef.close();
  }


  getTrashRef() {
    return collection(this.firestore, 'trash');
  }
  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getSingleDocRef(colId:string, docId:string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
