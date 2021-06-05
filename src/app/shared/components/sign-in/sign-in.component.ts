import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm : FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  errorFirebase:any;
  constructor(private authSerivice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async SignInAdmin(){

    const {email, password} = this.loginForm.value;

    try{
      const user = await this.authSerivice.signIn(email, password);
      if(user.user) { // porque retorna un response con un atributo user
        this.router.navigate(['/solicitudes/pendientes']);
      } else{ /// porque retorna un error
        //this.errorFirebase = user;
        if(user.code == "auth/user-not-found"){
          this.errorFirebase = "Correo no registrado";
        } else {
          this.errorFirebase = "Contraseña incorrecta";
        }
      }
    } catch( error ){
      console.log(error);
    }
  }

}
