import { Component, OnInit } from '@angular/core';
import { entries, Post } from 'config/entries';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
})
export class EntryListComponent implements OnInit {
  entries: Post[];
  
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
    this.entries = entries.map((entry) => ({
      ...entry,
      slug: this.slugify(entry.title),
    }));
  }
}
