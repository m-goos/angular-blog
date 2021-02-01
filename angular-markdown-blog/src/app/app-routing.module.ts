import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { // lazy load the blog component
    path: 'blog',
    loadChildren: () =>
      import('./blog/blog.module').then((m) => m.BlogModule),
  },
  // { path: 'images/:id', redirectTo: 'assets/Jump-starting-a-fresh-MacBook-for-Front-End-JavaScript-development/images/:id'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
