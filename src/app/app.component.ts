import { Component } from '@angular/core';
import { PostService } from './providers/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor( public _ps: PostService) {
    }
}
