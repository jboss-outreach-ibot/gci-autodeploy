# JbossOutreach.github.io/gci

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/61d5e178fd0f4212a3479528e40de20e)](https://www.codacy.com/app/garg-anuj/gci?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=JbossOutreach/gci&amp;utm_campaign=Badge_Grade) 
[![Join the chat at https://gitter.im/jboss-outreach/gci](https://badges.gitter.im/jboss-outreach/gci.svg)](https://gitter.im/jboss-outreach/gci?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) 
[![Build Status](https://travis-ci.org/JbossOutreach/gci.svg?branch=master)](https://travis-ci.org/JbossOutreach/gci)

The student site for GCI 2017 Students.

## Setting up project on local

### Getting ruby on your os installation :

```sh
$ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
$ curl -sSL https://get.rvm.io | bash           # setup rvm on your system
$ source ~/.rvm/scripts/rvm                     # setup rvm tocation
$ rvm install "ruby-2.4.2"                      # download ruby version 2.4.2 on your os
$ rvm use "ruby-2.4.2"                          # use ruby-2.4.2 on your os
```

### Setting up GCI project :

```sh
# fork and clone your fork of gci website and change dir to it
$ git clone https://github.com/<username>/gci.git
$ cd gci
```

### Running GCI project :

```sh
$ gem install bundler
$ bundle install
$ bundle exec jekyll serve --host 0.0.0.0
```

## Adding a mentor

To add a mentor you need to create a file with your github username `<username>.yml` in `_data/mentors` folder and please maintain the following format *EXACTLY* (replacing values where indicated):

```yaml
name: Your name
github: Your github username
image: your_image
bio: Some bio about yourself
blog: https://yourbloglink.com
```

**IMPORTANT:**

- All images must be optimized before uploaded to the repo via commit or PR. You may use any image optimizer of your choice.
- The images should be 240 x 240 pixels.
- Adding Facebook, Twitter, Github, etc. is not obliged. But if you do not want to include social media accounts, please do not provide empty fields like `facebook:`. Ask the mentors if you do not know their accounts.
- Avoid using contractions such as *can't, don't,* etc. If there is no choice (e.g. the name has single quote mark) put double quotes (`"`) around that part.
- Try to use abbreviations in your name wherever possible, i.e. restrict it to 13 letters (including spaces), otherwise it might be truncated automatically. However, the name will be displayed completely when you hover on it on the website.

**IMPORTANT:**

- All images must be optimized before uploaded to the repo via commit or PR. You may use any image optimizer of your choice.
- The images should be 240 x 240 pixels.
- Adding Facebook, Twitter, Github, etc. is not obliged. But if you do not want to include your social media accounts, please do not provide empty fields like `facebook:`.
- Avoid changing the whole file just to add yourself. Line endings should not change.
- Avoid using contractions such as *can't, don't,* etc. If there is no choice (e.g. your name has single quote mark) put double quotes (`"`) around that part.
- Try to use abbreviations in your name wherever possible, i.e. restrict your name in 13 letters (including spaces), otherwise your name might be truncated automatically. However, your name will be displayed completely when you hover on it on the website.


**IMPORTANT:**

- Put the images in the `/images/` folder. All images must be optimized before uploaded to the repo via commit or PR, you may use any image optimizer of your choice.
- Adding `action` and `actionURL` is not obliged. If you do not add, please do not provide empty fields like `action:`. If you do, please provide both `action` and `actionURL`.
- Try to equalize the length of `exp-1`, `exp-2`, and `exp-3` in combination with `action`.

# Finding Support

Probably the easiest way to seek help is to comment on your Task instance. Please understand that it is not easy for mentors to stay available 24/7 to reply to every comment.

You can instead participate in various chatrooms where you can ask both students and mentors for help. Here are few links to chatrooms that you could join for support:


1. Here are some links to some of project's chatroom:
   - [Google Code In](https://gitter.im/jboss-outreach/gci)

