# typus_fluxiom

https://github.com/wollzelle/typus_fluxiom

Fluxiom plugin for Typus

http://fluxiom.com/
https://github.com/typus/typus

## Installation

In your `Gemfile`:

    gem 'typus_fluxiom'

## Configuration

**In `config/fluxiom.yml`:**

    host: account.fluxiom.com
    user: user
    password: password
    ssl: false
    proxy: false 
    preview_width: 210
    preview_height: 210
    fit: true

**In your model:**

    class Post < ActiveRecord::Base
      serialize :gallery
      ...

**In `config/typus/application.yml`**

    Posts:
      fields:
        form: title, gallery
        options:
          templates:
            gallery: fluxiom_gallery
            ...


## Copyright

Copyright (c) 2015 Wollzelle GmbH. See LICENSE for details.
