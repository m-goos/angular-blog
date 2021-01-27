export interface Blog {
  title: string;
  slug?: string;
  date: Date;
}

export const blogs: Blog[] = [
  {
    title: 'How I Got Up To Speed In Angular',
    date: new Date('2020-12-23'),
  },
  {
    title: 'Jump-starting a fresh MacBook for Front End JavaScript development',
    date: new Date('2020-10-11')
  }
];
