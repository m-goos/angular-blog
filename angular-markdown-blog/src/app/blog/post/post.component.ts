import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post$: Observable<string> | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log('this is post.component');
    this.post$ = this.route.params.pipe(
      map((params) => `/assets/${params['id']}/${params['id']}.md`)
    );
  }
}
