import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment'

// SERVICES
import {LoginService} from '../providers/auth/login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  showmsg: any;
  // loginErrorMsg: string;
  loginError2 = false;
  // error: { errorTitle: '', errorDesc: '' };
  imagePath:any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public loginService: LoginService,
  )
  {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
    });
    this.imagePath = environment.Url +'/assets/';
  }

  ngOnInit(): void {
  }
  onSubmit()
  { 
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loginService.validateLogin(this.loginForm.value).subscribe(
      (response) => {
        if (response.body.code == 200) 
        { 
          localStorage.setItem('token', response.body.token);
          localStorage.setItem('user',  JSON.stringify(response.body));
         
          // localStorage.setItem('user', response.body);
          // this.router.navigate(['/']);
          // let user = localStorage.getItem('user');
        //   this.router.navigateByUrl('/home', {skipLocationChange: false}).then(() => {
        //     window.location.reload();
        // }); 
        this.router.navigate(['/home']);
        }
        else if(response.body.code == 400)
        {
          this.showmsg = 'Wrong Authentication'; 
        } 
      },
    );

  }
}
