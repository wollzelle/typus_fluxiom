class FluxiomTag < FluxiomResource
  self.site = FluxiomResource::FLUXIOM_SITE
  set_element_name 'tag'
  set_collection_name 'tags'
  
  def self.allTags
    self.find(:all).collect do |t| 
      {:tag => t.tag,
       :filter => t.tag.gsub(" ","_") }
    end
  end  
end