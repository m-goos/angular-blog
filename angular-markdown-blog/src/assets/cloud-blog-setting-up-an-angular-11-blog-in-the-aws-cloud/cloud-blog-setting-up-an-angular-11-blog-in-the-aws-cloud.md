# How to: build a blog with Angular 11, Markdown, Bootstrap 5 and the AWS Cloud (S3)
With this post I would like to share with you how you can setup your own blogging website from scratch, within an Angular 11 project. My goal is to show you how the following technologies work together: Angular 11, Bootstrap 5, AWS S3 (cloud storage) and Markdown. This post guides you in adding the simple blogging functionality with a very clean look. 

Together with you I will set up the blogging module for your website, style it and host it in the AWS cloud, in a so-called *S3 bucket* for static website hosting. The blogs will be written in [Markdown](https://daringfireball.net/projects/markdown/), a highly portable markup format, that I use often. With this setup, I can post my writings on [Techspire.nl](https://techspire.nl/blogs), to Techspire's Medium account and to my own blog with minimal editing. And that is just great!

If one of these technologies might be new to you:
- Bootstrap is a markup framework for building responsive websites. Where Bootstrap 4 still used jQuery, Bootstrap 5 (*beta*) now uses JavaScript.
- AWS S3 is the cloud storage solution from Amazon Web Services, very useful for static website hosting. By using this service, we can easily integrate cloud functionalities later on.
- Because we are using Markdown files for our blog, we can keep it simple: no databases, no CMS, just a nice looking blog.

You can find the code for this project in [this repository](https://github.com/m-goos/angular-blog) and view the live result [here](http://angular-serverless-blog.s3-website.eu-central-1.amazonaws.com/). The result:

|![List of blog posts](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/example.png)|![View of one post](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/example-1.png)|
|:---:|:---:|
|*List of blog posts*|*View of a single post*|

## Contents
1. Upgrade to the Angular CLI version 11
2. Add Markdown compatibility to Angular 11
3. The blog: project structure, code and explanation
3. Clean styling: css-template for Markdown and Bootstrap 5
4. Host the blog using cloud storage: AWS S3 bucket
5. Looking ahead: possible improvements such as a CDN and CI/CD

### Prerequisites
- A Full Stack JavaScript Development environment; see my [setup guide](https://techspire.nl/macbook-set-up-for-development/) for MacOS
- Some experience with Angular; see my [Angular starter guide](https://techspire.nl/up-to-speed-in-angular/)
- A (free tier) AWS account, create one [here](https://portal.aws.amazon.com/billing/signup?#/start)

## 1. Upgrade to the Angular CLI version 11
To check your Angular CLI version, type in your terminal `npm list -g @angular/cli`. Output: 
```zsh
/usr/local/lib
└── @angular/cli@11.1.1 # your Angular version
```

Not on version 11 yet? Update: `npm update -g @angular/cli@latest`. This should take you to the latest version of Angular. Now keep in mind that *updating might have consequences* for the compatibility of the CLI with your current Angular projects. See the Angular Update Guide ([x](https://update.angular.io/?v=10.0-11.0)) for detailed information about updating your project. By adding `@latest`, you are updating to the latest version; generally, Angular has a major release every 6 months.


## 2. Add Markdown compatibility to Angular 11
[Markdown](https://daringfireball.net/projects/markdown/) is a markup language by John Gruber that makes it easy to have your writing look clean and pretty. As a developer, you'll come across it sooner or later, because a lot of documentation is written in Markdown.
### Adding Markdown with ngx-Markdown
Set up or open an Angular project in the terminal and add [ngx-Markdown](https://www.npmjs.com/package/ngx-markdown) to the project: `npm install ngx-markdown --save`.

Now add some Markdown files that will be the content for the blog in the `assets` folder, located in the project root folder of your Angular project.
## 3. The blog: project structure, code and explanation
First we use the Angular CLI to generate a module for the blog. The module will provide routing for the blog posts and import the ngx-Markdown package. Then we add two components to this module: 
1. one component to list all the blog entries: entry-list,
2. one component to display individual posts.

```zsh
ng generate module blog
ng generate component blog/entry-list #list of entires
ng generate component blog/post #individual posts
```
The project now looks like this:

|![Project structure with blog components](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/project-structure-1.png)|![Project structure with blog components](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/project-structure-2.png)|
|:--:|:--:|
|*Project structure after*|*generating blog components*|

Next reference the blog module in your routes in `app.module.ts` or `app-routing.module.ts`. I am lazy loading the module here for performance reasons, but you could just point to the module:

```typescript
const routes: Routes = [
  ...
  { // lazy load the blog component
    path: 'blog',
    loadChildren: () =>
      import('./blog/blog.module').then((m) => m.BlogModule),
  },
  ...
];
```

Then include a simple route to the blog in your navbar, something like this:
```html
<div class="navbar">
  <a routerLink="/home">home</a> 
  <a routerLink="/blog">blog</a>
  <a routerLink="/about">about</a>
</div>
```

Later on, you can easily style the navbar using the Bootstrap 5 [navbar](https://getbootstrap.com/docs/5.0/components/navbar/) component.

### Configuring the Post component and routing
Setting up the actual blog takes 3 steps:
1. Configuring the blog module: `blog.module.ts`
2. Setting up the list of blog entries: `entry-list.component.ts`
3. Rendering the post we want to see: `post.component.ts`
When this is done, we can work on the styling with Bootstrap.

> This is the result we'll get after integrating Markdown compatibility, and before adding any css:

|![Blog Overview](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/intermediate-result-list.png)|![Individual post](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/intermediate-result-post.png)|
|:--:|:--:|
|Overview of blog posts|Individual post|

Alright, let's build the blog, following the three steps outlined above.

#### **1. Configuring blog.module.ts** - *[view this code on Github](https://github.com/m-goos/angular-blog/blob/main/angular-markdown-blog/src/app/blog/blog.module.ts)*  
We need to do a couple things in this module: 
- for the root (`/blog`) route: show a list of entries
- for every `/blog/title-of-a-post`, load the post based on that `title-of-a-post`
- load the module for ngx-Markdown

```typescript
// blog.module.ts
@NgModule({
  declarations: [EntryListComponent, PostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EntryListComponent,
      },
      // setting up the router to use parameters
      { path: ':id', component: PostComponent, pathMatch: 'full'}
    ]),
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
  ],
})
export class BlogModule {}
```

#### **2. Setting up the list of blog entries** - *[view this code on Github](https://github.com/m-goos/angular-blog/tree/main/angular-markdown-blog/src/app/blog/entry-list)*  
We need to do a couple things in this component: 
- write a list of entries and save it in a folder in the root of our project, e.g. in `config/entries.ts`. The list can look [like this one](https://github.com/m-goos/angular-blog/blob/main/angular-markdown-blog/config/entries.ts), and you'll have to write it yourself.
- based on that list, render a list on the webpage, in `entry-list.component.ts` and `entry-list.component.html`.

```typescript
// entry-list.component.ts
export class EntryListComponent implements OnInit {
  entries: Post[];
  
  constructor() {}

  // create a 'slug', which will be the url to the post
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
    // add the slug to the list of entries for entry-list.component.html
    this.entries = entries.map((entry) => ({
      ...entry,
      slug: this.slugify(entry.title),
    }));
  }
}
```

```html
<!-- entry-list.component.html -->
<div class="entry-list">
  <ol>
    <li *ngFor="let entry of entries">
      <div class="title">
        <a routerLink="/blog/{{ entry.slug }}">{{ entry.title }}</a>
      </div>
      <div class="published">Published on {{ entry.date | date }} by Marc</div>
    </li>
  </ol>
</div>
```


#### **3. Rendering the post we want to see** - *[view this code on Github](https://github.com/m-goos/angular-blog/tree/main/angular-markdown-blog/src/app/blog/post)*  
The final step is rendering the post using the ngx-Markdown plugin in the `post` component. We need to:
- use the route parameters from the URL to direct ngx-Markdown to the right file in `post.component.ts`
- render this file in `post.component.html`


```typescript
// post.component.ts
export class PostComponent implements OnInit {
  post$: Observable<string> | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  // use an observable to construct the path to the Markdown file:
    this.post$ = this.route.params.pipe(
      map((params) => `/assets/${params['id']}/${params['id']}.md`)
    );
  }
}
```

This `post` component gets the parameters from the URL using ActivatedRoute and then constructs the path for ngx-Markdown. In my blogging setup, every single post has its own folder. The folder name is in kebab-case, and is the same as the file name.
so it should get the blog at `/assets/how-i-got-up-to-speed-in-angular/how-i-got-up-to-speed-in-angular.md`. Every blog folder also holds its own `images` folder - and this makes the blogs very portable. With this setup, I can deploy my blogs on [Techspire.nl](www.techspire.nl), on Techspire's [Medium](https://medium.com/techspiration) account and to my own blog with *minimal* editing. And that is just great! 

|![Assets folder](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/assets-folder.png)|
|:-:|
|*Assets folder in the project*|

Finally rendering the `.md` file is easy:

```html
<!-- post.component.html -->
<div class="Markdown-post">
  <ng-container *ngIf="post$ | async as post">
    <div Markdown [src]="post"></div>
  </ng-container>
</div>
```

## 4. Make it pretty: Markdown css-template and Bootstrap 5
I did a short google search and found some great templates by John Otander. Feel free to check out [these four templates](http://Markdowncss.github.io/) and pick the one you like best. I'm going with [Splendor](https://github.com/Markdowncss/splendor). Now into the `app.component.scss` I am pasting in the stylesheet from [this gist](https://gist.github.com/m-goos/7d39260ed0e2db8f64f50edcbe479b26). The only things I modified are the page max-width, and heading font sizes. The result is surprisingly good for the amount of effort:

|![Splendor theme applied](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/splendor-result.png)|
|:-:|
|*Applying the [Splendor](https://github.com/Markdowncss/splendor) theme to our Markdown blog - navbar still needs some attention*|

If you are trying to style the rendered Markdown file, you will run into the problem that the markup specified in your `.(s)css` file is not applied to the Markdown. If we want the css to have any effect on our Markdown files, we need to work in the right way with Angular's ViewEncapsulation. If this concept is new to you, my colleague Arjen explains [the concept here](https://medium.com/dev-jam/understanding-angulars-viewencapsulation-5d8638859d4a). Now basically what we need to do is to specifically target the `div` that holds the freshly rendered markdown file. So in `post.component.html` we add an id like so:

```html
<div class="markdown-post">
  <ng-container *ngIf="post$ | async as post">
    <div id="markdown-post" markdown [src]="post"></div>
  </ng-container>
</div>
```

Next we target that id for all our markup in the `post.component.scss` like so:

|[![Target the markdown-post id](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/wrapping-scss.png)]|
|:---:|
|Target the markdown-post id|

As you see, both the navbar and our list of blog posts still need a bit of attention:

|![Navbar and blog post list need attention](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/intermediate-result-list.png)|
|:-:|
||

Let's implement [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/) via NPM ([instructions](https://getbootstrap.com/docs/5.0/getting-started/download/#package-managers)) for the header, navbar and entry-list:
```zsh
npm install bootstrap@next
```
After this, to get Bootstrap going, you need to include the Bootstrap css and js in your project. In the `angular.json` file under `styles` and `scripts`, include Bootstrap 5 like so:
```json
...
  ],
  "styles": [
    "src/styles.scss",
    "node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  "scripts": [
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
...
```

After some styling, this is the result:

|![List of blog posts](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/example.png)|![View of one post](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/example-1.png)|
|:-:|:-:|
|*List of blog posts*|*View of a single post*|

## 5. Host the blog using cloud storage: AWS S3 bucket
Before we can upload the blog, we build it for production: `ng build --prod`. We will upload the contents of the `dist` folder, so now we are ready to host our blog in the cloud. This is the easy part.

> Disclaimer: if you get any traffic to your website hosted in an S3 bucket like below, you will incur costs. 

As I am writing, for GET requests that is $0.0004 per GB, but [have a look at the S3 pricing](https://aws.amazon.com/s3/pricing/) and decide for yourself if you move on. For my current situation, that means I am paying a couple cents per year. With that out of the way:
### Creating an AWS S3 bucket for a static website
1. Log in at https://console.aws.amazon.com/ and open: `Services > S3 > create bucket`.
2. Choose your bucket name, it has to be unique across all existing S3 buckets.
3. In the configuration, untick `Block all public access` and explicitly acknowledge.
4. Click `Create Bucket`. Once created:
5. Open the Bucket, then: `Properties > Static website hosting > Edit`.
6. In the Static website hosting settings: `Enable`
7. For both the `Index document` and `Error document`, specify: `index.html` and Save Changes.

After saving these new settings, it is time to upload the blog.
### Uploading your files and explicitly enabling public access for the files
Now in S3, consider the Bucket as a folder, and the Objects are simply your files.
1. Under `Objects` in your Bucket hit `Upload`.
2. Open the `dist` folder from the Angular project, then the project folder inside that folder. My project folder is called `angular-Markdown-blog.
3. Upload all files in that folder, click the `Upload` button to confirm.

Once the upload has completed, there is one last step! By default, even in a publicly accessible S3 bucket, objects are not publicly accessible. To solve that:
1. Select all the objects in your bucket
2. `Actions > Make Public > confirm: Make Public`
3. Navigate back to your bucket and under Properties, scroll down to Static Website Hosting to find your website URL. Your website URL will look something like this: 
```
http://my-static-website.s3-website.eu-central-1.amazonaws.com
```
🚀 Go have a look at yours!  

> 🥳 Congratulations, you now have your personal, cloud-hosted blog.

## 6. Looking ahead: improvements such as CI/CD and a CDN
We built a nice and simple blog, based on Markdown files, using Angular 11, a css-template and Bootstrap 5. It is hosted in an AWS S3 bucket, feels pretty damn fast and looks good enough! Now, let's reflect on what we could possibly improve.. As always with web development, there are tons of things that can be improved. 

> In my next blog, I will show you how to implement the following improvements..

### Improvement 1: setting up a CI/CD pipeline
The first thing that comes to mind is that, with every improvement we make, we have to manually do a new production build and upload it to our S3 bucket. That is a bit tedious, and can get annoying if you notice one small mistake after another. To solve this, we could 
- set up a build process triggered by a new version of our `main branch`
- automatically push this change to the S3 bucket.

### Improvement 2: speed up content delivery with a CDN (CloudFront)
Currently the blog is being serverd from an unsecure http-domain, from an S3 Bucket. To improve the speed of content delivery, we can make use of CloudFront, Amazon's Content Delivery Network (CDN). This CDN caches the blog at nodes close to the user, improving delivery speed. It also allows us to configure the connection, so we could use the https protocol instead of the current http protocol.

### Improvement 3: add a personal domain name for better branding
Obviously, nobody is going to type in your URL if it looks like this: `http://my-static-website.s3-website.eu-central-1.amazonaws.com`. Great for our current purpose, but it is much nicer if we have our personal domain like `myname.com/blog`.

### Improvement 4: set up the infrastructure using Infrastructure-as-Code (Terraform)
In the last step of this how-to, we used the AWS console to set up our infrastructure. Then, in the improvements in this section, we again use the AWS console to further improve our project. However, if we do this using a Infrastructure-as-Code, all of this is provisioned, connected and configured from a simple infrastructure file we write in `HashiCorp Configuration Language (HCL)`, which reads a bit like `json`. This makes our work much more easy to check and replicable.
### Resources
The following resources have been helpful for writing this post. If you feel like diving into the topic a bit more, have a look:
- [Rendering Markdown in Angular](https://medium.com/wizdm-genesys/rendering-markdown-in-angular-37750d124247) - Lucio Francisco
- [Add a blog to your Angular Website](https://daviddalbusco.medium.com/add-a-blog-to-your-angular-website-using-Markdown-files-31cdb0627bdd) - David Dal Busco
- Getting certified in the AWS cloud: [Foundations](https://www.udemy.com/course/aws-certified-cloud-practitioner-new/learn/) course / [Developer](https://www.udemy.com/course/aws-certified-developer-associate/learn/) course
- [Jekyll](https://jekyllrb.com/) for static site generation
- [How to Blog](https://sneak.berlin/20150717/how-to-blog/) - Jeffrey Paul
- [Creating an Angular Jamstack blog](https://www.netlify.com/blog/2020/07/14/creating-an-angular-jamstack-blog/)

## Who Am I?
I’m Marc, a junior full stack engineer at [Techspire](www.techspire.nl) and I ride my bike in Amsterdam 🇳🇱 I have an engineering bachelor’s, an entrepreneurship master’s and when I am not coding, I am probably doing water sports.

Do you think you have what it takes to work with us? At Techspire we’re looking for people who love technology as much as we do, looking to push themselves to expand their knowledge. Also, we love a good story, a good laugh, and a few beers.

*This blog was originally published on https://techspire.nl/blogs/*