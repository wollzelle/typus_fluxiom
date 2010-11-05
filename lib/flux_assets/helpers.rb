module FluxAssets
  module ApplicationHelper
    def flux_image_for(path, format)
      return "#" if path.nil? || format.nil?
      return path.gsub(/_.*/, "_#{format}")
    end
  end
end

