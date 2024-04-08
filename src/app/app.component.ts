import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Users of the system ';
  users: User[] = [];
  userList: User[] = [];
  userForm!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getUSerAsyncPipe();
    this.initForm();
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

  getUSerAsyncPipe(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getUserAsync()
      .then((res) => {
        if (res) {
          this.userList = res;
          resolve(true);
        }
      })
      .catch(err => reject(err));
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_phone: '',
      nic: '',
      role_type: '',
      logged_user_name: '',
      logged_user_password: ''
    });
  }

  

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value)
      .subscribe(res => {
        console.log(res);
        this.getUSerAsyncPipe();
        this.userForm.reset();
        alert('User added successfully');
      });
    }
  }

}

