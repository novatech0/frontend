import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { AuthService } from "../../../shared/services/auth.service";
import {User} from "../../../shared/model/user";

@Component({
    selector: 'app-side-login',
    imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
    templateUrl: './side-login.component.html',
    styleUrls: ['./side-login.component.scss']
})
export class AppSideLoginComponent {
  options = this.settings.getOptions();
  user: User = new User(null,'', '', null);

  constructor(private settings: CoreService,
              private authService: AuthService,
              private router: Router) { }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) { return }
    this.user = new User(null, this.form.value.uname!, this.form.value.password!, null);
    this.authService.login(this.user).subscribe(response => {
      this.authService.saveUser(response.token);
      this.authService.saveToken(response.token);
      this.router.navigate(['']);
    })
  }
}
