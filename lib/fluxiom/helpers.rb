module Typus
  module Fluxiom
    module ApplicationHelper

      def flux_capacitor_for(path, format)
        return "#" if path.nil? || format.nil?
        path = path.match(/(.*\/([^_|.]*))/)[0] # returns the path without format
        format.gsub!(/^([^._])(.*)/, '_\1\2') # clean up the format
        return path+format
      end

      alias :flux_image_for :flux_capacitor_for
      alias :flux_preview_for :flux_capacitor_for
    
      def get_format      
        width    = Typus::Fluxiom.config.preview_width || 170
        height   = Typus::Fluxiom.config.preview_height || 100
        crop     = Typus::Fluxiom.config.preview_crop || false
        fill     = crop ? "f" : ""
        geometry = "#{width}x#{height}"
        format   = "#{fill}#{geometry}.jpg"
      end
    
      def get_name(model, attribute)
        model = model.class.to_s.underscore
        base_name = "#{model}[#{attribute}]"
      end

      def get_json(model, attribute)
        gallery_items = model[attribute].delete_if {|x| x == ""} rescue nil
        raw gallery_items.values.to_json rescue []
      end
        
      def get_translations
        Typus::Translate::Configuration.config["locales"] rescue nil
      end
    
    end
  end
end