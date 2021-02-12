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

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  getUsernameError(): string {
    if (this.username.hasError('required')) {
      return 'Введите имя пользователя';
    }
    return this.password.hasError('minlength') ? 'Минимум 6 символов' : '';
  }

  getPasswordError(): string {
    if (this.password.hasError('required')) {
      return 'Введите пароль';
    }
    return this.password.hasError('minlength') ? 'Пароль не менее 8 символов' : '';
  }

  clickLogin(): void {
    let user;
    user = new User();
    user.username = this.username.value;
    user.password = this.password.value;
    console.log(user);
    this.authService.login(user).subscribe(res => {

    }, error => {
      this.errorlogin = 'Ошибка при входе, проверьте правильность имени пользователя и пароля';
    });
  }
}
