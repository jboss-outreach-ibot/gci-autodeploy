# Running this project on Linux (Debian) 

### Getting ready for installation :

```sh
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install cmake                    # cmake to build c and cpp projects, ruby needs it
$ sudo apt-get install curl                     # tool to make/test http calls from terminal
```
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

Yay, You are up and running on http://localhost:4000
