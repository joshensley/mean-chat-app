import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-index-home',
  templateUrl: './index-home.component.html',
  styleUrls: ['./index-home.component.css']
})
export class IndexHomeComponent implements OnInit {
  loginUserId: any = "";
  users: any = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginUserId = this.userService.getUserId();

    this.userService.getAllUsers()
      .subscribe((users) => { this.users = users });

    
  }

}
