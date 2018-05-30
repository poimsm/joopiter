import { Component, OnInit } from '@angular/core';
import { PostService } from '../../providers/post.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public _ps:PostService) { }

  ngOnInit() {
  }

  ingresar(proveedor: string){

    this._ps.login( proveedor );

  }

}
