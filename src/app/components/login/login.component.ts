import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SKUService } from '../../services/sku.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private skuService: SKUService
  ) {
  }
  ngOnInit() {
  }
  public allusers: any = [];
  login(formValue: any) {
    var userCredentials = {
      username: formValue.username,
      password: formValue.password
    }
    this.skuService.validateUser(userCredentials).subscribe((res: any) => {
      if (!res.validated) {
        window.alert("No username");
      }
      else {
        sessionStorage.setItem('role', res.role);
        sessionStorage.setItem('username', formValue.username);
        sessionStorage.setItem('setting', "user");
        let update = new Date().toJSON("yyyy/MM/dd HH:mm");
        if (JSON.stringify(update) == null) {
          update = "No time recorded";
        }
        const login = {
          Username: "admin",
          activity: "Logged In",
          datetimestamp: JSON.stringify(update)
        }
        this.skuService.sendLog(login).subscribe((res: any) => {
        });
        this.router.navigate(['/dashboard']);
      }
    }, (error) => {
    });
  }
}