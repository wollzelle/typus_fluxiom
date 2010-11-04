class FluxAsset < FluxResource
  self.site = FluxResource::FLUXIOM_SITE
  self.format = :json
  set_element_name 'asset'
  set_collection_name 'assets'
  
  def self.recent(count = 10)
    sort_by_date(find(:all, :params => {:tags => FLUXIOM_API['tag'] })).first(count)
  rescue
    []
  end
  
  def self.search(term = '', tags = '', count = 400)
    begin
      if tags.nil?
        find(:all, :query => term) #.first(count)
      else
        find(:all, :params => {:tags => tags, :query => term}) #.first(count)
      end
    rescue
      nil
    end
  end
  
  def download(options = {})
    http = Net::HTTP.new(FLUXIOM_API['host'], FLUXIOM_API['ssl'] ? 443 : 80)
    http.use_ssl = FLUXIOM_API['ssl']
    http.start do |connection|
      download_file("/api/assets/download/#{self.id}", options[:original_file], connection, true) if options[:original_file]
      download_file(self.thumb_url, options[:thumb_file], connection) if options[:thumb_file]    
    end
  end
  
  def user
    FluxUser.find(self.user_id)
  end
  
  protected
    
    def self.sort_by_date(assets)
      assets.sort do |a,b| 
        b.created_on <=> a.created_on
      end
    end
    
    def download_file(path, save_to, connection, authenticate = false)
      request = Net::HTTP::Get.new(path)
      request.basic_auth FLUXIOM_API['user'], FLUXIOM_API['password'] if authenticate
      response = connection.request(request)
      open(save_to, 'wb') do |file|
        file.write(response.body)
      end
    end
end