import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  defaultImageUrl = "http://rentacarproject.abdulsametozdemir.com/images/default-image.jpg"
  userImage:string;

  userLoginCheck:boolean;
  user:UserDetail;

  constructor(private authService:AuthService, private userService:UserService, private router:Router, private userImageService:UserImageService) { }

  ngOnInit(): void {
    this.loginCheck();
  }
  loginCheck(){
    this.userLoginCheck = this.authService.isAuthenticated();
    if(this.userLoginCheck){
      let mail = localStorage.getItem("mail");
      this.userService.getUserByMail(mail).subscribe(response=>{
        this.user = response.data;
        this.userImageService.getByUserId(this.user.id).subscribe(response=>{
          this.userImage = "http://rentacarproject.abdulsametozdemir.com/"+response.data.imagePath;
        })
      })
    }
  }
  logOut(){
    this.authService.logOut();
    this.loginCheck();
  }
  route(id:number){
    this.router.navigate(["user/"+id])
  }
}