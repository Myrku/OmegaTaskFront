import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {User} from '../../model/User';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  username = new FormControl('', [Validators.required, Validators.minLength(6)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  errorRegister: string;
  successRegister: string;
  showProgress = false;

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  GetUsernameError(): string {
    if (this.username.hasError('required')) {
      return 'Введите имя пользователя';
    }
    return this.username.errors.minlength ? 'Минимум 6 символов' : '';
  }

  GetEmailError(): string {
    if (this.email.hasError('required')) {
      return 'Введите адрес электронной почты';
    }
    return this.email.hasError('email') ? 'Неверный формат электронной почты' : '';
  }

  GetPasswordError(): string {
    if (this.password.hasError('required')) {
      return 'Введите пароль';
    }
    return this.password.hasError('minlength') ? 'Пароль не менее 8 символов' : '';
  }

  GetConfPasswordError(): string {
    if (this.confPassword.hasError('required')) {
      return 'Введите повторный пароль';
    }
    return (this.confPassword.value !== this.password.value) ? 'Введенные пароли не совпадают' : '';
  }

  ClickRegister(): void {
    let user;
    user = new User();
    user.username = this.username.value;
    user.password = this.password.value;
    user.email = this.email.value;
    user.role = 2;
    this.showProgress = true;
    this.authService.Register(user).subscribe(res => {
      this.successRegister = 'Успешная регистрация';
      this.showProgress = false;
    }, error => {
      this.errorRegister = 'Ошибка регистрации';
      this.showProgress = false;
    });
  }
}
