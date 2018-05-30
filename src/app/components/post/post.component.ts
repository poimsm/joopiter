import { Component, OnInit } from '@angular/core';
import { PostService } from '../../providers/post.service';
import { DataService } from '../../providers/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
post: string = "";

  constructor( public _ps:PostService, public _ds:DataService ) {
    // this._ps.getPost().subscribe();
    this._ds.getPost().subscribe();
  }

  ngOnInit() {  }
  enviar_post(){
    if( this.post.length === 0){
      return;
    }
    this._ds.addPost( this.post )
            .then( ()=>this.post="")
            .catch( (err)=>console.error('Error al enviar', err));
  }

  // enviar_post2(){
  //   if( this.post2.length === 0){
  //     return;
  //   }
  //   this._ds.addPost( this.post2 )
  //           .then( ()=>this.post2="")
  //           .catch( (err)=>console.error('Error al enviar', err));
  // }
}
