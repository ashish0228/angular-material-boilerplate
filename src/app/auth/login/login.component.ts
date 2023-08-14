import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { responseModel } from 'src/app/model/reponseModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    // In case you want to use email pattern for validators then use below patter.
    // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('access-token');
    if (token) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  submit() {
    if (this.loginForm.invalid) {
      return
    }

    this.authService.login(this.loginForm.value).subscribe((res: responseModel) => {
      this.authService.setTokenInLocalStorage('tokenValue');
      this.router.navigateByUrl('/dashboard');
      this.authService.setisLoginValue(true);
    });



    // Set Token in localstorage using this method
    this.authService.setTokenInLocalStorage('tokenValue');
    this.authService.setisLoginValue(true);
    this.router.navigateByUrl('/dashboard');
  }


}
