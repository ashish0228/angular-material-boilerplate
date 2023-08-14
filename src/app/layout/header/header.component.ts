import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { responseModel } from 'src/app/model/reponseModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showLogout = false;
  userToken: any;
  constructor(private authService: AuthService,
    private router: Router) {
      /**
       * check that use is login or not base on that we will show hide login logout button
       */
    this.authService.isLogin.subscribe((res) => {
      this.userToken = localStorage.getItem('access-token');
      if (this.userToken) {
        this.showLogout = true;
      } else {
        this.showLogout = res;
      }
    })
  }

  ngOnInit(): void {
  }

  /**
   * Logut api will call and if api goes successfull it will clear localstorage and return t login page
   */
  logout() {
    this.authService.logout(this.userToken).subscribe((res: responseModel) => {
    // to clear locaslstorage value and clear token and permission use this method
    this.authService.clearLocalStorage();

      this.router.navigateByUrl('/login');
    });
    // to clear locaslstorage value and clear token and permission use this method
    this.authService.clearLocalStorage();
    this.authService.setisLoginValue(false);
    this.router.navigateByUrl('/login');
  }

}
