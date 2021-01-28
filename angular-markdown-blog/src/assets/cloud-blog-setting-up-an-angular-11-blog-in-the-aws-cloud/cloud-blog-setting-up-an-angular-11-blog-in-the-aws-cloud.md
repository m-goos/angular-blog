# Cloud blog: Setting up an Angular 11 blog in the AWS Cloud
> UNDER CONSTRUCTION 🤓

In this post we'll add MarkDown blogging functionality to an Angular 11 project. The result is a blog that looks very clean, with minimal effort. I'll show the steps to set up a fresh Angular 11 project, which we then edit to become a blog based on MarkDown files. We then deploy the blog to the cloud, using the storage solution of the *Amazon Cloud*, Amazon Web Services (AWS) S3. Finally blog explains how set up the AWS Content Delivery Network (CloudFront) for routing and faster page loads.

> If you have an existing Angular project to which you would like to add a blog section based on MarkDown files, look no further 😉

This is what the result will look like:
|![List of blog posts]()|![View of one post]()|
|:-:|:-:|
|List of blog posts|View of a single post|

Here, we'll keep it simple and deploy this cloud based blog project in very little time. No Database, no CMS, just a nice-looking blog using a Markdown-plugin for Angular: ngx-markdown. Sounds easy? Let's begin!

## Contents
1. Set up an Angular 11 project
1. Add MarkDown compatibility to Angular 11
3. Make it pretty: MarkDown css-template
2. Host the blog using cloud storage: AWS S3 bucket
3. Set up a Content Delivery Network or CDN: AWS CloudFront
5. Looking ahead: CI/CD pipeline and your personal domain name

## Prerequisites
For this post I'll assume that you have (1) a full stack development environment set up for JavaScript (see this [previous blog](https://techspire.nl/macbook-set-up-for-development/)) (2) basic familiarity with Angular, or another SPA-framework such as React or Vue and (3) an AWS account, or are excited to take your first steps here (entry level, no worries!). I am using a MacBook for development, but feel free to use your OS of choice.

## Generating an Angular 11 project
This section shows you how to upgrade to the latest version of Angular. Next, we set up an Angular project in a couple minutes, using Angular's Command Line Interface (or CLI). Then we try the sample project in our local browser. If that works, we create a first production build that we can upload to the cloud.

### Updating the Angular CLI to the latest version
Before we begin, let's check what version of the Angular CLI we are currently on, and what other globally installed, relevant packages might be outdated. Open a new terminal window  and punch in:
```zsh
marc:~$ npm outdated -g  

# output
Package       Current   Wanted   Latest  Location
@angular/cli   10.2.1   10.2.1   11.1.1  global
lighthouse      6.4.1    6.5.0    7.0.0  global
npm            6.14.8  6.14.11  6.14.11  global
sass           1.27.0   1.32.5   1.32.5  global
typescript      4.0.3    4.1.3    4.1.3  global
```

If you are not on the latest version of Angular yet, feel free to update your Angular CLI: `npm update -g @angular/cli@latest`. Now keep in mind that by adding `@latest`, you are updating to the latest version. While I write this blog, that is 11. But you might end up with a different, more recent version if you read this in half a year. See the [Angular Update Guide](https://update.angular.io/?v=10.0-11.0) for more detailed information updating your project. Now let's see the result of the update:
```zsh
marc:~$ npm list -g @angular/cli
/usr/local/lib
└── @angular/cli@11.1.1 
```
Success! We are now on the latest version of Angular.

### Optional: set up version control
For any project, it is nice to set up git for version control straight away. Here I am assuming you have an account for GitHub. If not, create an account on GitHub and set up your local machine to connect to that account with [these](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) SSH-instructions.

I'll go with GitHub here, but you might just as well use GitLab or a self-hosted version of git such as [gitea](https://gitea.io/en-us/). Now create a new repository: [https://github.com/new](https://github.com/new), choose a fitting repository name (angular-blog for me), and tick some boxes: 
- add a README, 
- add a .gitignore file (choose node) 
- add a licence (for example MIT)  
- click: `Create Repository`. 

Once the repository is created, open a local terminal window and clone the GitHub repository you just created. I am using SSH, and the terminal commands I use look like this:
```zsh
# make a local projects folder
marc:~$ mdkir projects

# cd (change directory) into that folder
cd projects

# clone the github repository
marc:~/projects$ git clone git@github.com:[your-username]/[your-repo-name].git

# change into that new repository
marc:~/projects$ cd angular-blog 
marc:~/projects/angular-blog/(main).$
#success!
```

Now we are ready to create a new project.

### Setting up a fresh Angular 11 project
To generate a new project with the Angular CLI, use `ng new` followed by your project name of choice. You will then be presented with a couple options for your projects. This is what that looks like in my terminal:

```zsh
marc:~/projects/angular-blog/(main).$ ng new angular-markdown-blog
? Do you want to enforce stricter type checking and stricter bundle budgets in the workspace? Yes
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS 
```

Now use your terminal to navigate into the newly generated project folder and in that folder, to launch your project and directly open the web browser type:
```zsh
# --open flag launches web browser
ng serve --open
```

Now the result:
|![New Angular project](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/new-angular-project.png)|
|:--:|
|*The result of setting up your new project will look similar to this*|
## Implementing a simple and clean-looking blog using Markdown
[Markdown](https://daringfireball.net/projects/markdown/) is a markup language that makes it easy to have your writing look clean and pretty. As a developer, you come across it sooner or later, because a lot of documentation is written using Markdown.

Before continuing, I'm opening my new Angular project in VS Code and I will clear out the contents of `app.component.html`. Now we can start implementing our blog.
### 1. Adding Markdown compatibility: ngx-markdown
Add [ngx-markdown](https://www.npmjs.com/package/ngx-markdown) to the project: `npm install ngx-markdown --save`.

Now let's add some content for our blog, by adding two markdown files in the assets folder of the Angular project. If you don't have anything ready, just copy this one.

### 2. Setting up the blog
First we use the Angular CLI to generate a module for the blog. The module can provide routing for the blog posts and import the ngx-markdown package (reference: [Architecture](https://angular.io/guide/architecture-modules) / [CLI](https://angular.io/cli/generate#module)). Then we add two components to this module: one for an overview of all the blog entries, and one to display individual posts.
```zsh
ng generate module blog
ng generate component blog/entry-list
ng generate component blog/post
```

Don't forget to reference the blog module in `app.module.ts`, and include the route in your routes array. [TK: show github gist with the code or link to the repo]

After integrating MarkDown compatibility in our blog, it looks like this:

|![Blog Overview](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/intermediate-result-list.png)|![Individual post](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/intermediate-result-post.png)|
|:--:|:--:|
|Overview of blog posts|Individual post|

>Now let's move to the next step: **to make our blog look pretty**.

*This specific section was thankfully looking at a blog by [David Dal Busco](https://daviddalbusco.com/blog/add-a-blog-to-your-angular-website-using-markdown-files).*

## Make it pretty: MarkDown theme from css-template
I did a short google search and found some great templates by [John Otander](https://johno.com/). Feel free to [check out these four templates](http://markdowncss.github.io/) and pick the one you like best. I'm going with [Splendor](https://github.com/markdowncss/splendor). Now into the `post.component.scss` I am pasting in the stylesheet from [this gist](https://gist.github.com/m-goos/7d39260ed0e2db8f64f50edcbe479b26). The only things I modified are the page max-width, and heading font sizes. The result is surprisingly good for the amount of effort:

|![Splendor theme applied](assets/cloud-blog-setting-up-an-angular-11-blog-in-the-aws-cloud/images/splendor-result.png)|
|:-:|
|*Applying the [Splendor](https://github.com/markdowncss/splendor) theme to our MarkDown blog*|

If we want css to have any effect on our MarkDown files, we need to apply a bit of a hack to our `post.component.ts` - as discussed in [this](https://github.com/jfcere/ngx-markdown/issues/56#issuecomment-373722506) Github issue. Because of Angular's view encapsulation and the way ngx-markdown renders our content. We need to disable ViewEncapsulation:

```typescript
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {
```

As you see, the navbar still needs a bit of attention. Our list of blog posts needs some attention too. Let's implement a bit of Bootstrap.

## Host the blog using cloud storage: AWS S3 bucket
Before uploading the blog, we need to build it:
```
ng build --prod
```

## Final thoughts
A follow-up post will detail how you can set up a CI/CD pipeline for this blog project, to automatically deploy any updates, and register a domain name. 

Things to figure out:
It would be great to have the entry-list page to auto-generate the titles based on the files in the assets folder. 
### Resources
The following resources have been helpful while writing this post:
- https://medium.com/wizdm-genesys/rendering-markdown-in-angular-37750d124247
- https://daviddalbusco.medium.com/add-a-blog-to-your-angular-website-using-markdown-files-31cdb0627bdd
- https://medium.com/bb-tutorials-and-thoughts/how-to-build-an-angular-static-website-with-aws-s3-f3c00ddf07c2
- https://medium.com/@peatiscoding/here-is-how-easy-it-is-to-deploy-an-angular-spa-single-page-app-as-a-static-website-using-s3-and-6aa446db38ef
- https://jekyllrb.com/
- https://www.netlify.com/blog/2020/07/14/creating-an-angular-jamstack-blog/