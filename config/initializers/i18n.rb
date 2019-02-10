require_relative '../locales/locales'

I18n.config.available_locales = Locales::AVAILABLE.keys
Rails.application.config.i18n.default_locale = :fr
Rails.application.config.i18n.fallbacks = [:fr]
