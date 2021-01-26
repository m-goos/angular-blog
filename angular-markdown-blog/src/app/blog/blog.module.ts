import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { BlogViewComponent } from './blog-view/blog-view.component';



@NgModule({
  declarations: [BlogViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', loadChildren: './blog/blog-view.module#BlogViewModule'},
      {path: 'post', loadChildren: './post/blog-post-view.module#BlogPostViewModule'},
    ]),
    MarkdownModule.forRoot()
  ]
  ]
})
export class BlogModule { }
