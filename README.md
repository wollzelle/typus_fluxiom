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

use branch "3-0-stable"

## Configuration

### One account

**In `config/typus_fluxiom.yml`:**

    host: account.fluxiom.com
    user: user
    password: password
    ssl: false
    proxy: false

**In your model:**

    class Post < ActiveRecord::Base
      typus_fluxiom :gallery
      typus_fluxiom :photos, preview: { width: 400, height: 200, crop: true } #Use different preview sizes
      ...

### Multiple accounts

**In `config/typus_fluxiom.yml`:**

  account1:
    host: account1.fluxiom.com
    user: user
    password: password
    ssl: false
    proxy: false

  account2:
    host: account2.fluxiom.com
    user: user
    password: password
    ssl: false
    proxy: false

**In your model:**

    class Post < ActiveRecord::Base
      typus_fluxiom :gallery, account: 'account1'
      typus_fluxiom :photos,  account: 'account2', preview: { width: 400, height: 200, crop: true } #Use different preview sizes
      typus_fluxiom :other_images #Uses first account as default (account1)


## Copyright

Copyright (c) 2011 Wollzelle GmbH. See LICENSE for details.