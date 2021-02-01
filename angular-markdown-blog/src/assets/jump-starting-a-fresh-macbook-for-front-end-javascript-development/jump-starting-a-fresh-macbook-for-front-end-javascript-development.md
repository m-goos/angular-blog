[mos-1]: assets/jump-starting-a-fresh-macbook-for-front-end-javascript-development/images/mos-1.png "Mos preferences"
[mos-2]: assets/jump-starting-a-fresh-macbook-for-front-end-javascript-development/images/mos-2.png "Mos preferences advanced"
[tools]: assets/jump-starting-a-fresh-macbook-for-front-end-javascript-development/images/tools.jpeg "Setting up our tools"
[touchbar-1]: assets/jump-starting-a-fresh-macbook-for-front-end-javascript-development/images/touchbar-1.png "Navigating to touchbar settings"
[touchbar-2]: assets/jump-starting-a-fresh-macbook-for-front-end-javascript-development/images/touchbar-2.png "customizing touchbar settings"
[touchbar-3]: assets/jump-starting-a-fresh-macbook-for-front-end-javascript-development/images/touchbar-3.png "Touchbar settings menu"
[touchbar-screenshot]: assets/jump-starting-a-fresh-macbook-for-front-end-javascript-development/images/touchbar-screenshot.png "Screenshot of touchbar setup"
[trackpad-1]: assets/jump-starting-a-fresh-macbook-for-front-end-javascript-development/images/trackpad-1.png "Navigating to trackpad settings"
[trackpad-2]: assets/jump-starting-a-fresh-macbook-for-front-end-javascript-development/images/trackpad-2.png "Enabling three finger drag"
[vscode-settings]: assets/jump-starting-a-fresh-macbook-for-front-end-javascript-development/images/vscode-settings.png "Accessing VS Code settings through command palette"
[zsh]:  assets/jump-starting-a-fresh-macbook-for-front-end-javascript-development/images/zsh.png "Z Shell after changing the configuration"

Jump-starting a MacBook for Front End development
==================================================================
In the past months, I set up a MacBook for full stack JavaScript development five times — technical difficulties, 🍾 a new job at [Techspire](https://medium.com/techspiration) (hiring!), a new computer at a client, you name it. If, like me, you have hobbies, this is not the thing you want to be spending your time on. So the next time I am setting up a machine, I will be copy-pasting from this article. Or, even better, automating the setup. I hope this saves you some time too, and that you pick up a trick or two. This article discusses:

1.  **Homebrew** package manager to quickly install what we need
2.  **macOS** settings for trackpad, mouse and a customized touchbar
3.  **Terminal** settings (zsh) for readability, tab completion, git functionalities
4.  **Visual Studio Code** configuration for JavaScript/TypeScript
5.  Closing thoughts on **automation (dotfiles) and good resources**

|![Setting up our tools][tools]|
|:--:|
|Picture by [@barnimages](https://unsplash.com/@barnimages) on [unsplash](https://unsplash.com/photos/t5YUoHW6zRo)|

Before continuing, it is useful to update macOS. Open a terminal and run:

```
softwareupdate -i -a
```
*This guide was written with MacOS Catalina in mind*.

Homebrew: package manager
=========================

As [Homebrew](https://brew.sh/) puts it, Homebrew installs the stuff you need that Apple didn’t. This package manager will make it much faster for us to install whatever we need to start developing, such as Node, Visual Studio Code and Slack. Instead of navigating to different websites, downloading packages and clicking install, it will be as easy as running `brew cask install visual-studio-code`. To install Homebrew, run this in your terminal:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Now comes the time-saver, run this in the terminal:

```
brew install node && brew cask install visual-studio-code postman slack spotify mos google-chrome
```

As you might notice, `brew install` works for node, but not for anything with a GUI. Anything with a GUI requires `brew cask install <package-name>` ([about cask](https://stackoverflow.com/questions/46403937/what-is-the-difference-between-brew-install-xxx-and-brew-cask-install-xxx/)). If there is anything you need to add, do a `brew search <package-name>` ([or see formulae.brew.sh/cask](https://formulae.brew.sh/cask/)) to see if the package can be installed via Homebrew. While Homebrew is working in the background, let us continue 🤓

macOS interaction settings
==========================

Essential for how the interaction with your machine feels are the keyboard, mouse and trackpad. And their settings, obviously. I will hold myself back here and not get into the hardware now … Let me simply say that I work with an external keyboard, an external trackpad _and_ a mouse. Below are the settings that boost my productivity.

Trackpad
--------

Open _spotlight search_ (⌘ + space) and go to the _trackpad_ settings. Most important is _tap to click_, but I simply enable all options here, on all three tabs. Next my **favourite hidden setting**, in spotlight search for _trackpad,_ then:

> _Accessibility → Pointer Control → Trackpad Options → Enable dragging → three finger drag_

![Navigating to trackpad settings][trackpad-1]  |  ![Enabling three finger drag][trackpad-2]
:-------------------------:|:-------------------------:
<br>

Now, you can drag windows and sliders with three fingers **without** clicking.

Mouse settings: independent scroll direction for trackpad & mouse
-----------------------------------------------------------------

The natural scroll direction from a trackpad works well for me, but with a mouse wheel, I just cannot get used to it. In macOS, there are linked — but there is a solution! [Mos](https://mos.caldis.me/). Install: `brew cask install mos`. Now for the configuration, launch Mos go to Preferences. Enable `Reverse Scroll`, `Launch on Login`, and under Advanced, a `Toggle Key` for horizontal scrolling. Enjoy!

![Mos settings][mos-1]  |  ![Mos settings advanced][mos-2]
:-------------------------:|:-------------------------:
| *Indepenedent and horizontal scrolling* | |

Most of the time, you probably have many windows open at once, such as an IDE, terminal and web browser. Horizontal scrolling is very useful for the windows that do not scale to fit all the content.

Touch bar optimization / customization
--------------------------------------

Aahhh, that dreaded touch bar, who does not have an opinion about it… This is how to customize it:

> (⌘ + space) → touchbar (open: keyboard) → Customise Control Strip


|![customizing the touchbar settings][touchbar-1]  |  ![customizing the touchbar settings][touchbar-2] |  ![customizing the touchbar settings][touchbar-3] |
|:---:|:---:|:---:|
| *Customzing the touchbar settings*  |

In the keyboard section, set `Touch Bar shows: 'Expanded Control Strip'`. Then click on `Customize Control Strip` to start editing the touch bar. This is actually a really nice gimmick, where you can drag the icons you want into the touch bar. I chose to not completely fill my Touch Bar, like so:

|![touch bar setup][touchbar-screenshot]|
|:--:|
| *Buttons: Media — Brightness Slider — Do Not Disturb — Volume — Screen Lock* |

Dock settings: remove unnecessary icons, auto-hide
--------------------------------------------------

> right click dock → Dock Preferences →Automatically hide and show the Dock

Terminal (zsh): readability, tab completion, git
================================================

Now it is time to change the way the terminal looks and behaves, by adding some colour, more explicit git control and tab completion. There are many tutorials for terminal customization, but for now I shamelessly copied the settings from my [team lead](https://medium.com/@arjenbrandenburgh). The result:

|![][zsh]|
:--:
|*Z Shell after changing the configuration*|
<br>

Check out the settings [in this gist](https://gist.github.com/mhlgoossens/27fef06063470b3fed23c1087f0419af), and copy them from line 5 onwards. Then use [nano](https://support.apple.com/en-gb/guide/terminal/apdb02f1133-25af-4c65-8976-159609f99817/mac) (the built in command line text editor) to create and edit a text file:

```
nano ~/.zshrc
```

Paste in the settings from [this](https://gist.github.com/mhlgoossens/27fef06063470b3fed23c1087f0419af) gist, then save (⌃+o) and exit (⌃+x). Now apply and finalize the changes:

```
source ~/.zshrc  
compaudit | xargs chmod g-w
```

Restart your terminal to see the effect.

**Visual Studio Code** configuration
====================================

The fastest way of changing settings in VS Code is through the Command Pallete: ⌘+⇧+P.

|![][vscode-settings]|
|:--:|
|*VS Code configuration*|
<br>
Now you can either <code>Open User Settings</code> and configure your preferences, or open the JSON file to edit your settings. I use these settings ([gist](https://gist.github.com/mhlgoossens/b8ca7feabe67aead8b556301c5752e15)) to enable settings such as Word Wrap, Auto Save, Tab Size and hiding the Mini Map on the right hand side.

Keybindings settings
--------------------

To change the tab-switching behaviour, so [what happens](https://stackoverflow.com/questions/38957302/is-there-a-quick-change-tabs-function-in-visual-studio-code) when pressing (⌃+⇥). I hate the dropdown menu, I want it to behave like google chrome. Open the Command Pallete again (⌘+⇧+P) and `Open Keyboard Shortcuts (JSON)`. Paste in [these keybindings settings](https://gist.github.com/mhlgoossens/265e56046f77923064725912abb2a61e) and enjoy.

VS Code extensions
------------------

*   [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) for a better editing experience
*   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for opinionated code formatting (and its [pre-commit hook](https://prettier.io/docs/en/precommit.html))
*   [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for trying simple local projects
*   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for, well, linting
*   [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) for optimal Git experience

Closing thoughts: automation and further reading
================================================

While I write, I like to read up on what I am writing about. To correct my thinking and to see if there is a smarter way of doing what I am writing about. This final section is about the next steps of optimizing the setup flow.

Dotfiles
--------

Ideally, all these settings would be saved to some external repository, ready to fully configure your new machine with one or two commands. Well, [automation is possible](https://www.marcusoft.net/2018/08/what-i-learned-when-installing-developer-computers-in-hours.html). ‘Dotfiles’ are the hidden configuration files on our computers — like the`.zshrc` we used before. So what about them?

> **_Backup_**, **_restore_**, and **_sync_** the prefs and settings for your toolbox. Your dotfiles might be the most important files on your machine. \[[dotfiles.github.io/](https://dotfiles.github.io/)\]

Further reading
---------------

*   An [accessible introduction](https://appliedtechnology.github.io/protips/dotfiles) to dotfiles by Marcus Hammarberg, linking to some examples
*   [Oh My Zsh](https://ohmyz.sh/), a framework for managing your Zsh configuration
*   [masOS Setup Guide](https://sourabhbajaj.com/mac-setup/), a well-structured and detailed guide for setting up

Who am I?
=========

I’m a junior full stack engineer at [Techspire](http://www.techspire.nl) and ride my bike in Amsterdam 🇳🇱 I have an engineering bachelor’s, an entrepreneurship master’s and when I am not coding, I am probably doing water sports.

Do you think you have what it takes to work with us? At [Techspire](https://techspire.nl/careers/) we’re looking for people who love technology as much as we do, and are looking to push themselves to expand their knowledge. Also, we love a good story, a good laugh, and a few beers.

_This blog has previous been published on_ [_https://techspire.nl/blogs/_](https://techspire.nl/blogs/)
