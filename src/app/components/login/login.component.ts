import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TokenModel } from 'src/app/models/tokenModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  defaultImageUrl = "http://rentacarproject.abdulsametozdemir.com/images/default-image.jpg"

  loginForm:FormGroup;
  token:TokenModel;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private authService:AuthService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required]
    })
  }
  

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        this.token = response.data;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("mail", loginModel.email);
        this.authService.authControl();
        this.toastrService.success(response.message, "Başarılı")
      }, responseError=>{
        this.toastrService.error(responseError.error, "Giriş Yapılamadı")
      })
    }
  }
}
