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
  confpassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  errorRegister: string;
  successRegister: string;

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getUsernameError(): string {
    if (this.username.hasError('required')) {
      return 'Введите имя пользователя';
    }
    return this.username.errors.minlength ? 'Минимум 6 символов' : '';
  }

  getEmailError(): string {
    if (this.email.hasError('required')) {
      return 'Введите адрес электронной почты';
    }
    return this.email.hasError('email') ? 'Неверный формат электронной почты' : '';
  }

  getPasswordError(): string {
    if (this.password.hasError('required')) {
      return 'Введите пароль';
    }
    return this.password.hasError('minlength') ? 'Пароль не менее 8 символов' : '';
  }

  getConfpasswordError(): string {
    if (this.confpassword.hasError('required')) {
      return 'Введите повторный пароль';
    }
    return (this.confpassword.value !== this.password.value) ? 'Введенные пароли не совпадают' : '';
  }

  clickRegister(): void {
    let user;
    user = new User();
    user.username = this.username.value;
    user.password = this.password.value;
    user.email = this.email.value;
    user.role = 2;
    console.log(user);

    this.authService.register(user).subscribe(res => {
      console.log(res);
      this.successRegister = 'Успешная регистрация';
    }, error => {
      console.log(error);
      this.errorRegister = 'Ошибка регистрации';
    });
  }
}
