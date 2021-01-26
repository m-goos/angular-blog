import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [BlogViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BlogViewComponent,
      },
      {
        path: 'post',
        loadChildren: './post/blog-post-view.module',
      },
    ]),
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),

  ],
})
export class BlogModule {}
