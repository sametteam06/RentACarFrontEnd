import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  defaultImageUrl = "https://localhost:44358/images/default-image.jpg"

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private authService:AuthService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.minLength(8)]],
      firstName:["", Validators.required],
      lastName:["", Validators.required]
      })
  }



  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.success(response.message, "Başarılı")
      }, responseError=>{
        this.toastrService.error(responseError.error, "Dikkat")
      })
    }
  }

}
