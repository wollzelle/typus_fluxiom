# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "fluxiom/version"

Gem::Specification.new do |s|
  s.name        = "typus_fluxiom"
  s.version     = Fluxiom::VERSION
  s.authors     = ["Thomas Koenig", "William Meleyal", "I.C. Wiener"]
  s.email       = "team@wollzelle.com"
  s.homepage    = "http://wollzelle.com"
  s.summary     = "Typus module for Fluxiom"
  s.description = "Typus module for Fluxiom"

  s.rubyforge_project = "typus_fluxiom"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_runtime_dependency "typus"
  # s.add_runtime_dependency "jquery-rails"
  # s.add_runtime_dependency "rails-backbone"
  s.add_runtime_dependency "ejs"
end
