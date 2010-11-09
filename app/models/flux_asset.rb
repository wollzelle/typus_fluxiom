class FluxAsset < FluxResource
  self.site = FluxResource::FLUXIOM_SITE
  self.format = :json
  set_element_name 'asset'
  set_collection_name 'assets'
  
  FILTER_TAG = FluxAssets::Configuration.config['filter_tag'] || ''
  
  def self.recent(count = 10)
    sort_by_date(find(:all, :params => {:tags => FLUXIOM_API['tag'] })).first(count)
  rescue
    []
  end
  
  def self.search(term = '', tags = '')
    tags = "#{FILTER_TAG} #{tags}"
    find(:all, :params => {:tags => tags, :query => term})
  end
  
  def user
    FluxUser.find(self.user_id)
  end
  
  def medium_thumbnail_url
    @medium_thumbnail ||= "http://thumbs.fluxiom.com/" + self.thumb_url.gsub(/_64.jpg$/, '_128.jpg')
  end

  def large_thumbnail_url
    @large_thumbnail ||= "http://thumbs.fluxiom.com/" + self.thumb_url.gsub(/_64.jpg$/, '_256.jpg')
  end
  
  protected
    
    def self.sort_by_date(assets)
      assets.sort do |a,b| 
        b.created_on <=> a.created_on
      end
    end
  
end