module Typus
  module Fluxiom
    module ClassMethods

      def extended_modules
        (class << self; self end).included_modules
      end

      def typus_fluxiom(*args)
        cattr_accessor :typus_fluxiom_options, :typus_fluxiom_fields
        self.typus_fluxiom_fields  ||= []
        self.typus_fluxiom_options ||= {}

        options = args.extract_options!

        args.each do |field|
          self.typus_fluxiom_fields << field
          self.typus_fluxiom_options[field] = options
          serialize field
        end

        extend TemplateMethods unless extended_modules.include?(TemplateMethods)
      end
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