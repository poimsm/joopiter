import { Component, OnInit } from '@angular/core';
import { DataService } from '../../providers/data.service';
import { BrowserService } from '../../providers/browser.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// var async = require('async');
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.css']
})
export class HotComponent implements OnInit {
  showResp = false;
  showImg = false;
  observableData : number;

  post:any;
  show = false;
  i:any = 1;

  LikeCounterPost: number = 0;
  LikeCounterComentario: number = 0;
  ComentarioCounter: number = 0;
  comentarios:any = [];
  posts:any = [];
  promise: Promise<any>;
  postt : any;
  likee: any;
  comentarioss: any;

  likeC: number = 0;
  likeShow: number = 0;
  comentC: number = 0;
  // promise: Promise<any>;
  showLike = true;
  likeDado = false;
  k: number = 999;
  likeflag = true;
  c=true;

  // num=[1 2 3];
  l: number;

    constructor( public _browserService:BrowserService, public _ds:DataService,  private router: Router  ) {

      this._ds.getUser().subscribe();
      this._ds.getPost().subscribe( x => this.postt = x );
      this._ds.getComent().subscribe( x => this.comentarioss = x );
      this._ds.getLike().subscribe( x => this.likee = x );
      // this._ds.getObservable().subscribe();

    }

    ngOnInit() {


    // for (let post of this._ds.posts){
    //
    //   for (let comentario of this._ds.comentarios){
    //     if (comentario.post_id === post.post_id){
    //       this.ComentarioCounter += 1;
    //
    //       for (let like of this._ds.likes){
    //         if (like.comentario_id === comentario.comentario_id){
    //           this.LikeCounterComentario +=1;
    //         }
    //       };
    //
    //     this.comentarios.push({
    //       nombre: comentario.nombre,
    //       mensaje: comentario.mensaje,
    //       Nlikes: this.LikeCounterComentario
    //     });
    //
    //     this.LikeCounterComentario = 0;
    //
    //     }
    //
    //   };
    //
    //   for (let like of this._ds.likes){
    //     if (post.post_id === like.post_id){
    //       this.LikeCounterPost += 1;
    //     }
    //   };
    //
    //   this.posts.push({
    //     pId: post.post_id,
    //     nombre: post.nombre,
    //     mensaje: post.mensaje,
    //     Ncomentarios: this.ComentarioCounter,
    //     Nlikes: this.LikeCounterPost,
    //     comentarios: this.comentarios
    //   });
    //   this.LikeCounterPost = 0;
    //   this.ComentarioCounter = 0;
    //   this.comentarios = [];
    // }




    }


    likecounter(){
      this.likeC += 1;
    }
    likereset(){
      this.likeC = 0;
    }
    comentcounter(){
      this.comentC += 1;
    }
    comentreset(){
      this.comentC = 0;
    }
    likedado(){

    }


    chao(){
    return new Promise((resolve, reject) =>{
      setTimeout(()=>resolve('holaaaa'),2000)

    })
  }

  saludos(){
  return new Promise((resolve, reject) =>{
    setTimeout(()=>{
      for (let like of this.likee){
                this.likeC = this.likeC + 1;};
                resolve(this.likeC)

    },2000)


  })
}

  // async  hey(){
  //   await for (let like of this.likee){
  //             this.likeC = this.likeC + 1;};
  //             return this.likeC
  //   }



    navegar(){
      this._browserService.goPlaces('user');
    }


    // data(){
    //   this._ds.addUser();
    //   this._ds.addPost('ajam');
    //   this._ds.addComent('ujum');
    //   this._ds.addLike();
    //   console.log('se fue!!')
    //
    // }
    plot(){
      console.log(this._ds.usuarios)
      console.log(this._ds.posts)
      console.log(this._ds.comentarios)
      console.log(this._ds.likes)
    }

    findId(dom){
      this.x(dom);
    }
    x(dom){
      console.log(dom)

    }

    agregarLikePost(dom){
      this._ds.addLikeByPost(dom);
    }
    quitarLikePost(){
    }

    LikeToPost(postId: string){
      this._ds.updateLike(postId);
    }


  }
