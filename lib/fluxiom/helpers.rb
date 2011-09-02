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
  end
end

