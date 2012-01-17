module Typus
  module Fluxiom
    module ClassMethods
      @@typus_fluxiom_fields = []
      @@typus_fluxiom_options  = {}

      mattr_accessor :typus_fluxiom_options, :typus_fluxiom_fields

      def typus_fluxiom(*args)
        options = args.extract_options!
        args.each do |field|
          self.typus_fluxiom_fields << field
          self.typus_fluxiom_options[field] = options
          serialize field
        end

        extend TemplateMethods unless extended_modules.include?(TemplateMethods)
      end
    end

    def extended_modules
      (class << self; self end).included_modules
    end

    module TemplateMethods
      def typus_template(attribute)
        if self.typus_fluxiom_fields.include? attribute.to_sym
          'fluxiom'
        else
          super(attribute)
        end
      end
    end

  end
end