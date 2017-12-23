## Steps for running this project on eclipse-che with codenvy.

You will need to setup your codenvy account for the n steps

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/Uq9k9R7yZeQ/0.jpg)](https://www.youtube.com/watch?v=Uq9k9R7yZeQ)

Next just follow these steps.

* Create a 3 GB workspace with `default blank stack`
* Create a server at port 4000 on this workspace.

```sh
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install cmake

$ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
$ \curl -sSL https://get.rvm.io | bash
$ source ~/.rvm/scripts/rvm

# fork and clone your fork of gci website and change dir to it
$ git clone https://github.com/<username>/gci.git
$ cd git

$ rvm install "ruby-2.4.2"
$ gem install bundler
$ bundle install
$ bundle exec jekyll serve --no-watch --host 0.0.0.0
```
