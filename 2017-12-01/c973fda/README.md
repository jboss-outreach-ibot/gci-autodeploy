# jboss-outreach.github.io/gci

[![Join the chat at https://gitter.im/jboss-outreach/gci](https://badges.gitter.im/jboss-outreach/gci.svg)](https://gitter.im/jboss-outreach/gci?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The student site for GCI 2017 Students.

# Adding a mentor

To add a mentor you need to create a file with your github username `<username>.yml` in `_data/mentors` folder and please maintain the following format *EXACTLY* (replacing values where indicated):

```yaml
name: Your name
github: Your github username
image: your_image
twitter: Your twitter id
facebook: Your facebook id
bio: Some bio about yourself
blog: https://yourbloglink.com
lat: Your latitude
lng: Your longitude
```

**IMPORTANT:**

- All images must be optimized before uploaded to the repo via commit or PR. You may use any image optimizer of your choice.
- The images should be 240 x 240 pixels.
- Adding Facebook, Twitter, Github, etc. is not obliged. But if you do not want to include social media accounts, please do not provide empty fields like `facebook:`. Ask the mentors if you do not know their accounts.
- Avoid using contractions such as *can't, don't,* etc. If there is no choice (e.g. the name has single quote mark) put double quotes (`"`) around that part.
- Try to use abbreviations in your name wherever possible, i.e. restrict it to 13 letters (including spaces), otherwise it might be truncated automatically. However, the name will be displayed completely when you hover on it on the website.

# Adding yourselves to student section

To add yourself to student section you need to create a file with your github username `<username>.yml` in `_data/students` folder and please maintain the following format *EXACTLY* (replacing values where indicated):

```yaml
name: Your name
github: Your github username
image: your_image
twitter: Your twitter id
facebook: Your facebook id
bio: Some bio about yourself
lat: Your latitude
lng: Your longitude
```

**IMPORTANT:**

- All images must be optimized before uploaded to the repo via commit or PR. You may use any image optimizer of your choice.
- The images should be 240 x 240 pixels.
- Adding Facebook, Twitter, Github, etc. is not obliged. But if you do not want to include your social media accounts, please do not provide empty fields like `facebook:`.
- Avoid changing the whole file just to add yourself. Line endings should not change.
- Avoid using contractions such as *can't, don't,* etc. If there is no choice (e.g. your name has single quote mark) put double quotes (`"`) around that part.
- Try to use abbreviations in your name wherever possible, i.e. restrict your name in 13 letters (including spaces), otherwise your name might be truncated automatically. However, your name will be displayed completely when you hover on it on the website.

# Blog Post

To add your blog post, you need to open the file `blogs.yml` in `_data` folder. Maintain the following format *EXACTLY* (replacing values where indicated) to enter your blog in this website.

```yaml
- name: Your name
  blog: https://yourbloglink.com
  blog_img: your_image
  article: Article title
  article_link: https://yourarticlelink.com
```

**IMPORTANT:**

- The image should be placed inside `images/blogs` folder, and `your_image` should be the file's name, for example `mypost.png`. Make sure that the images are in 16:9 aspect ratio.
- If you do not provide a blog image, a default image will be displayed.
- Adding article and article_link is optional, unless your task requires it.



**IMPORTANT:**

- Put the images in the `/images/` folder. All images must be optimized before uploaded to the repo via commit or PR, you may use any image optimizer of your choice.
- Adding `action` and `actionURL` is not obliged. If you do not add, please do not provide empty fields like `action:`. If you do, please provide both `action` and `actionURL`.
- Try to equalize the length of `exp-1`, `exp-2`, and `exp-3` in combination with `action`.

# Finding Support

Probably the easiest way to seek help is to comment on your Task instance. Please understand that it is not easy for mentors to stay available 24/7 to reply to every comment.

You can instead participate in various chatrooms where you can ask both students and mentors for help. Here are few links to chatrooms that you could join for support:


1. Here are some links to some of project's chatroom:
   - [Google Code In](https://gitter.im/jboss-outreach/gci)

