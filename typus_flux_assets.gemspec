# Generated by jeweler
# DO NOT EDIT THIS FILE DIRECTLY
# Instead, edit Jeweler::Tasks in Rakefile, and run the gemspec command
# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{typus_fluxio}
  s.version = "1.2.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["T Koenig"]
  s.date = %q{2010-12-01}
  s.description = %q{the fluxiom assets browser for typus}
  s.email = %q{t.koenig@wollzelle.com}
  s.extra_rdoc_files = [
    "LICENSE",
     "README.rdoc"
  ]
  s.files = [
    "app/controllers/flux_assets_controller.rb",
     "app/models/flux_asset.rb",
     "app/models/flux_resource.rb",
     "app/models/flux_tag.rb",
     "app/models/flux_user.rb",
     "app/views/admin/templates/_flux_gallery.html.erb",
     "app/views/admin/templates/_flux_gallery_javascripts.js.erb",
     "app/views/admin/templates/_flux_gallery_stylesheets.css.erb",
     "app/views/flux_assets/_javascripts.js.erb",
     "app/views/flux_assets/_stylesheets.css.erb",
     "app/views/flux_assets/index.html.erb",
     "app/views/layouts/flux_assets.html.erb",
     "config/routes.rb",
     "lib/flux_assets/configuration.rb",
     "lib/flux_assets/engine.rb",
     "lib/flux_assets/helpers.rb",
     "lib/typus_flux_assets.rb"
  ]
  s.homepage = %q{http://wollzelle.com}
  s.rdoc_options = ["--charset=UTF-8"]
  s.require_paths = ["lib"]
  s.rubygems_version = %q{1.3.7}
  s.summary = %q{the fluxiom assets browser for typus}
  s.test_files = [
    "test/helper.rb",
     "test/test_flux_assets.rb"
  ]

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<thoughtbot-shoulda>, [">= 0"])
    else
      s.add_dependency(%q<thoughtbot-shoulda>, [">= 0"])
    end
  else
    s.add_dependency(%q<thoughtbot-shoulda>, [">= 0"])
  end
end

