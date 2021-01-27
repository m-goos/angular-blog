import { Component, OnInit } from '@angular/core';
import { blogs, Blog } from 'config/blogs';


@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
})
export class EntryListComponent implements OnInit {
  // to do: geen ANY type
  blogs: Blog[];
  dash = /-/g;
  
  constructor() {}

  slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  ngOnInit(): void {
    console.log(blogs);

    // HTML-logica hierheen verplaatsen
    // replaceAll
    this.blogs = blogs.map((blog) => ({
      ...blog,
      ...{ slug: this.slugify(blog.title) },
    }));
  }
}
