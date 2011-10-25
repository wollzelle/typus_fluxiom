# typus_fluxiom

Fluxiom module for Typus, adds support for including media from Fluxiom.com.

* http://fluxiom.com
* https://github.com/wollzelle/typus_fluxiom
* https://github.com/fesplugas/typus

## Installation

### Rails >= 3.1

In your `Gemfile`:

    gem 'typus_fluxiom'

### Rails <= 3.0

In your `Gemfile`:

    gem 'typus_fluxiom', '~> 3.0'

## Configuration

**In `config/typus_fluxiom.yml`:**

    host: account.fluxiom.com
    user: user
    password: password
    ssl: false
    proxy: false 
    preview_width: 210
    preview_height: 210
    preview_crop: true

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
            gallery: fluxiom
            ...

## Copyright

Copyright (c) 2011 Wollzelle GmbH. See LICENSE for details.