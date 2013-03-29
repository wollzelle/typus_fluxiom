# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "fluxiom/version"

Gem::Specification.new do |s|
  s.name        = "typus_fluxiom"
  s.version     = Typus::Fluxiom::VERSION
  s.authors     = ["Thomas Koenig", "William Meleyal"]
  s.email       = "team@wollzelle.com"
  s.homepage    = "http://wollzelle.com"
  s.summary     = "Fluxiom module for Typus"
  s.description = "Adds support for including media from Fluxiom"

  s.rubyforge_project = "typus_fluxiom"

  s.files         = `git ls-files`.split("\n")
  s.require_paths = ["lib"]

  s.add_dependency "rails", ">= 3.1.0"
  s.add_dependency "typus"
  s.add_dependency "coffee-rails", ">= 3.1.0"
  s.add_dependency "jquery-rails"
  s.add_dependency "backbone-on-rails", "0.9.2.1"
  s.add_dependency "eco"
end