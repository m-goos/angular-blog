export interface Post {
  title: string;
  slug?: string;
  date: Date;
}

export const entries: Post[] = [
  {
    title: 'Cloud blog: Setting up an Angular 11 blog in the AWS Cloud',
    date: new Date('2021-01-27'),
  },
  {
    title: 'How I Got Up To Speed In Angular',
    date: new Date('2020-12-23'),
  },
  {
    title: 'Jump-starting a fresh MacBook for Front End JavaScript development',
    date: new Date('2020-10-11')
  }
];
