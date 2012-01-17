module Admin::FluxiomHelper
  @@default_preview_options = { width: 170, height: 100, crop: false}
  def flux_capacitor_for(path, format)
    return "#" if path.nil? || format.nil?
    path = path.match(/(.*\/([^_|.]*))/)[0] # returns the path without format
    format.gsub!(/^([^._])(.*)/, '_\1\2') # clean up the format
    return path+format
  end

  alias :flux_image_for :flux_capacitor_for
  alias :flux_preview_for :flux_capacitor_for

  def get_format(model, attribute)
    options = model.class.typus_fluxiom_options[attribute.to_sym][:preview] || {}
    config = @@default_preview_options.merge(options)
    width    = config[:width]
    height   = config[:height]
    crop     = config[:crop]
    fill     = crop ? "f" : ""
    geometry = "#{width}x#{height}"
    width   = crop ? width : height
    {:width => width, :height => height, :url => "#{fill}#{geometry}.jpg"}
  end

  def get_name(model, attribute)
    model = ActiveModel::Naming.param_key(model) # => model_name
    "#{model}[#{attribute}]"
  end

  def get_account(model, attribute)
    model.class.typus_fluxiom_options[attribute.to_sym][:account]
  end

  def get_json(model, attribute)
    gallery_items = model[attribute].delete_if {|x| x == ""} rescue nil
    raw gallery_items.values.to_json rescue []
  end

  def get_translations
    locales = Typus::Translate::Configuration.config["locales"] rescue nil
    raw locales.keys.to_json rescue []
  end
end