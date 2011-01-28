class FluxiomUser < FluxiomResource
  self.site = FluxiomResource::FLUXIOM_SITE
  set_element_name 'user'
  set_collection_name 'users'
  
  def full_name
    self.first_name + ' ' + self.last_name
  end
end