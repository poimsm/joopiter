import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// import {Observable} from 'rxjs/Rx';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';

export interface Usuario {
  nombre: string;
  fecha: number;
  usuario_id: string;
}
export interface Post {
  nombre: string;
  mensaje: string;
  fecha: number;
  usuario_id: string;
  post_id: string;
}
export interface Comentario {
  nombre: string;
  mensaje: string;
  fecha: number;
  usuario_id: string;
  post_id: string;
  comentario_id: string;
}
export interface Like {
  nombre: string;
  usuario_id: string;
  post_id: string;
  comentario_id?: string;
  likepost?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  usr: any;
  usuarios: any = [];
  posts: any = [];
  comentarios: any = [];
  likes: any = [];
  ob: any;

  private usuariosCollection: AngularFirestoreCollection;
  private postsCollection: AngularFirestoreCollection<Post>;
  private comentariosCollection: AngularFirestoreCollection<Comentario>;
  private likesCollection: AngularFirestoreCollection<Like>;


  constructor( private afs: AngularFirestore, public afAuth: AngularFireAuth ){
      this.afAuth.authState.subscribe( user => {
        if(!user){
          return}
        this.usr = {
            nombre: user.displayName,
            fecha: new Date().getTime(),
            usuario_id: user.uid
          };
      });

    }


// -----------------------------------------------------------


    login( proveedor: string ) {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      }

    logout() {
        this.usuarios = null;
        this.afAuth.auth.signOut();
      }

// -----------------------------------------------------------


// getObservable(){
//   return Observable
//           .interval(1000).take(10).map((v) => v * v);
// }


agregarPost(mensaje: string){
  this.posts.post_id = this.afs.createId()
  let post:Post = {
    nombre: this.usr.nombre,
    mensaje: mensaje,
    fecha: new Date().getTime(),
    usuario_id: this.usr.usuario_id,
    post_id: this.posts.post_id
  }
  return this.afs.collection('posts').add(post);
}

agregarComentario(mensaje: string, postId: string){
  this.comentarios.comentario_id = this.afs.createId()
  const comentario: Comentario = {
    nombre: this.usr.nombre,
    mensaje: mensaje,
    fecha: new Date().getTime(),
    usuario_id: this.usr.usuario_id,
    post_id:  this.posts.post_id,
    comentario_id: this.comentarios.comentario_id
  }
}

agregarLikePost( postId: string ){
  const like:Like = {
  nombre: this.usr.nombre,
  usuario_id: this.usr.usuario_id,
  post_id:  postId,
  }
  return this.afs.collection("likes").add(like);
}

agregarLikeComentario(postId: string, comentarioId: string){
  const like:Like = {
  nombre: this.usr.nombre,
  usuario_id: this.usr.usuario_id,
  post_id:  postId,
  comentario_id: comentarioId
  }
  return this.afs.collection("likes").add(like);
}







  addUser(){
      let usuario: Usuario = {
        nombre: this.usr.nombre,
        fecha: this.usr.fecha,
        usuario_id: this.usr.usuario_id
      }
      console.log(usuario);
      return this.afs.collection("usuarios").add(usuario);
    }

    addPost( mensaje: string ){
      this.posts.post_id = this.afs.createId()
      let post:Post = {
        nombre: this.usr.nombre,
        mensaje: mensaje,
        fecha: new Date().getTime(),
        usuario_id: this.usr.usuario_id,
        post_id: this.posts.post_id
      }
      return this.afs.collection('posts').add(post);
    }

    addComent( mensaje: string ){
      this.comentarios.comentario_id = this.afs.createId()
      const comentario: Comentario = {
        nombre: this.usr.nombre,
        mensaje: mensaje,
        fecha: new Date().getTime(),
        usuario_id: this.usr.usuario_id,
        post_id:  this.posts.post_id,
        comentario_id: this.comentarios.comentario_id
      }
      return this.afs.collection("comentarios").add(comentario);
    }

    addLikeByPost( postId: string ){
      const like:Like = {
      nombre: this.usr.nombre,
      usuario_id: this.usr.usuario_id,
      post_id: postId
      }
      return this.afs.collection("likes").add(like);
    }

    addLikeByComent(){
      const like:Like = {
      nombre: this.usr.nombre,
      usuario_id: this.usr.usuario_id,
      post_id:  this.posts.post_id,
      comentario_id: this.comentarios.comentario_id
      }
      return this.afs.collection("likes").add(like);
    }

    updateLike(postId: string){
      return this.afs.collection('likes').doc(postId).set({
        likepost: true
      });
    }

// -----------------------------------------------------------


    getUser(){
      this.usuariosCollection = this.afs.collection('usuarios', ref => ref.orderBy('fecha','desc').limit(5));
      return this.usuariosCollection.valueChanges()
                                  .map( (usuarios:Usuario[])=>{
                                    this.usuarios = [];
                                    for (let usuario of usuarios){
                                      this.usuarios.push( usuario );
                                    }
                                  })
    }


    getPost(){
      this.postsCollection = this.afs.collection<Post>('posts', ref => ref.orderBy('fecha','desc').limit(5));
      return this.postsCollection.valueChanges()
                                  .map( (posts: Post[])=>{
                                    this.posts = [];
                                    for (let post of posts){
                                      this.posts.push( post );
                                    }
                                    return this.posts
                                  })
    }

    getComent(){
      this.comentariosCollection = this.afs.collection<Comentario>('comentarios', ref => ref.orderBy('fecha','desc').limit(5));
      return this.comentariosCollection.valueChanges()
                                  .map( (comentarios: Comentario[])=>{
                                    this.comentarios = [];
                                    for (let comentario of comentarios){
                                      this.comentarios.push( comentario );
                                    }
                                    return this.comentarios
                                  })
    }

    // getLike(postId: string, comentId: string){
    //   if (postId != 'null'){
    //     this.likesCollection = this.afs.collection<Like>('likes');
    //     return this.likesCollection.valueChanges()
    //                                 .map( (likes: Like[])=>{
    //                                   this.likes = [];
    //                                   for (let like of likes){
    //                                     this.likes.push( like );
    //                                   }
    //                                 })
    //   }
    //   if (comentId != 'null'){
    //     this.likesCollection = this.afs.collection<Like>('likes');
    //     return this.likesCollection.valueChanges()
    //                                 .map( (likes: Like[])=>{
    //                                   this.likes = [];
    //                                   for (let like of likes){
    //                                     this.likes.push( like );
    //                                   }
    //                                 })
    //   }
    //
    // }

    getLike(){
        this.likesCollection = this.afs.collection<Like>('likes');
        return this.likesCollection.valueChanges()
                                    .map( (likes: Like[])=>{
                                      this.likes = [];
                                      for (let like of likes){
                                        this.likes.push( like );
                                      }
                                      return this.likes
                                    })


    }





}
