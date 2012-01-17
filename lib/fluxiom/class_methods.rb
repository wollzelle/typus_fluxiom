module Typus
  module Fluxiom
    module ClassMethods
      def typus_fluxiom(*args)
        class_attribute :typus_fluxiom_attributes
        options = args.extract_options!
        self.typus_fluxiom_attributes = args
        args.each do |field|
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
        if self.typus_fluxiom_attributes.include? attribute.to_sym
          'fluxiom'
        else
          super(attribute)
        end
      end
    end

  end
end