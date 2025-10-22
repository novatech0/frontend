import {Component, OnInit} from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import {AuthService} from "../../../shared/services/auth.service";
import {User} from "../../../shared/model/user";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-side-register',
    imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
    templateUrl: './side-register.component.html',
    styleUrls: ['./side-register.component.scss']
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();
  user: User = new User(null,'', '', null);

  constructor(private settings: CoreService,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('ROLE_FARMER', [Validators.required])
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) { return }
    const roles = ['ROLE_USER', this.form.value.role!];
    this.user = new User(null, this.form.value.uname!, this.form.value.password!, roles);
    this.authService.signup(this.user).subscribe(response => {
      // TODO: Debe llevar a la página de crear perfil
      this.router.navigate(['']);
    },
      _error => {
        this.toastr.error('Error al registrar el usuario', 'Error de registro');
      })
  }
}
