import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  username = new FormControl('', [Validators.required, Validators.minLength(6)]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  errorlogin: string;
  showProgress = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  GetUsernameError(): string {
    if (this.username.hasError('required')) {
      return 'Введите имя пользователя';
    }
    return this.password.hasError('minlength') ? 'Минимум 6 символов' : '';
  }

  GetPasswordError(): string {
    if (this.password.hasError('required')) {
      return 'Введите пароль';
    }
    return this.password.hasError('minlength') ? 'Пароль не менее 8 символов' : '';
  }

  ClickLogin(): void {
    let user;
    user = new User();
    user.username = this.username.value;
    user.password = this.password.value;
    this.showProgress = true;
    this.authService.Login(user).subscribe(res => {
      this.showProgress = false;
    }, error => {
      this.errorlogin = 'Ошибка при входе, проверьте правильность имени пользователя и пароля';
      this.showProgress = false;
    });
  }
}
