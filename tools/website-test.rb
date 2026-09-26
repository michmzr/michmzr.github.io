# frozen_string_literal: true

require 'minitest/autorun'
require 'nokogiri'

# Run against a root-configuration Jekyll build, never the theme demo.
class WebsiteTest < Minitest::Test
  ROOT = ARGV.shift || '/tmp/cybershu-redesign'
  BASELINE = ENV['WEBSITE_BASELINE']

  def document(path)
    Nokogiri::HTML(File.read(File.join(ROOT, path)))
  end

  def test_page_families_and_shared_navigation
    %w[index.html page2/index.html page3/index.html archive.html about.html uses.html consultations.html contact.html 404.html commandbook.html].each do |path|
      page = document(path)
      assert page.at_css('main#main'), "Missing main landmark: #{path}"
      assert page.at_css('header nav[aria-label]'), "Missing navigation: #{path}"
      assert page.at_css('footer a[href="/feed.xml"]'), "Missing RSS: #{path}"
      assert page.at_css('footer button[data-cookie-settings]'), "Missing preferences: #{path}"
      assert page.at_css('header nav a[href="/contact.html"]'), "Missing Contact navigation: #{path}"
      assert page.at_css('footer nav a[href="/contact.html"]'), "Missing Contact footer link: #{path}"
      assert_equal 1, page.css('h1').size, "Expected one title: #{path}"
    end
  end

  def test_contact_has_email_and_readable_social_profiles_without_forms_or_comments
    assert File.file?(File.join(ROOT, 'contact.html')), 'Missing Contact route'
    page = document('contact.html')
    assert page.at_css('main .contact-page'), 'Missing Contact content'
    assert page.at_css('header nav a[href="/contact.html"][aria-current="page"]'), 'Contact must be the active navigation item'
    email = page.at_css('.contact-page a.contact-email')
    refute_nil email, 'Missing primary email link'
    assert_equal 'mailto:kontakt@cybershu.eu', email['href']
    assert_includes email.text, 'kontakt@cybershu.eu'

    expected = {
      'https://www.linkedin.com/in/michmzr' => /LinkedIn/,
      'https://twitter.com/MichalMzr' => /\bX\b/,
      'https://github.com/michmzr' => /GitHub/
    }
    profiles = page.css('.contact-socials a')
    assert_equal expected.keys.sort, profiles.map { |link| link['href'].delete_suffix('/') }.sort
    profiles.each do |link|
      assert_match expected.fetch(link['href'].delete_suffix('/')), link.text.strip
      icons = link.css('svg')
      refute_empty icons, "Missing profile icon: #{link['href']}"
      icons.each do |icon|
        assert_equal 'true', icon['aria-hidden']
        assert_equal 'false', icon['focusable']
      end
    end
    assert_empty page.css('.contact-page a[href*="facebook.com"]')
    assert_empty page.css('main form, main iframe, [data-provider="Disqus"], #disqus_thread')
    assert_empty page.css('script[src]').select { |script| script['src'].include?('disqus') }
  end

  def test_forms_and_comments_are_configured_to_autoload
    posts = Dir.glob(File.join(ROOT, '**/*.html')).select { |path| File.read(path).include?('itemprop="articleBody"') }
    assert_equal 19, posts.size
    posts.each do |path|
      page = Nokogiri::HTML(File.read(path))
      assert_equal 1, page.css('[data-provider="Disqus"][data-provider-auto]').size, path
    end
    %w[consultations.html confitura-2026-resilience-w-erze-ai-notatki-prelegenta.html javeloper-2026-zrob-cebulowego-sassa-notatki-prelegenta.html].each do |path|
      page = document(path)
      forms = page.css('[data-provider="Tally"], [data-provider="involve.me"]')
      refute_empty forms
      forms.each { |form| assert form.key?('data-provider-auto'), path }
      assert_empty page.css('iframe[loading="lazy"]'), path
    end
  end

  def test_analytics_and_sharing_remain_optional
    %w[index.html consultations.html confitura-2026-resilience-w-erze-ai-notatki-prelegenta.html javeloper-2026-zrob-cebulowego-sassa-notatki-prelegenta.html].each do |path|
      page = document(path)
      # Template contents are inert. Inspect active elements only.
      page.css('template').remove
      assert_empty page.css('script[src], iframe[src]').select { |e| e['src'].match?(/googletagmanager|addtoany/) }, path
      assert page.at_css('#cookie-preferences'), path
    end
  end

  def test_content_contracts
    consultation = document('consultations.html')
    assert_equal 6, consultation.css('.path-card').size
    assert_equal 2, consultation.css('a[href="#book-consultation"]').size
    assert consultation.at_css('#book-consultation [data-provider]')
    assert document('archive.html').at_css('[data-archive]')
    assert_equal 8, document('index.html').css('.post-row').size
    assert_equal 8, document('page2/index.html').css('.post-row').size
    assert_equal 3, document('page3/index.html').css('.post-row').size
    assert_equal 'pl', document('confitura-2026-resilience-w-erze-ai-notatki-prelegenta.html').at_css('html')['lang']
  end

  def test_existing_routes_fragments_and_downloads
    skip 'Set WEBSITE_BASELINE to a pre-change build' unless BASELINE
    Dir.glob(File.join(BASELINE, '**/*.html')).each do |source|
      path = source.delete_prefix(BASELINE + '/')
      assert File.file?(File.join(ROOT, path)), "Lost route: #{path}"
      old = Nokogiri::HTML(File.read(source))
      current = document(path)
      old_body = old.at_css('.article__content')
      new_body = current.at_css('.article__content')
      if old_body && new_body
        [old_body, new_body].each { |body| body.css('script, style, .provider-panel').remove }
        assert_equal old_body.text.split.join(' '), new_body.text.split.join(' '), "Changed article prose: #{path}"
      end
      old.css('.article__content h1[id], .article__content h2[id], .article__content h3[id], .article__content h4[id]').each do |heading|
        assert current.xpath('//*[@id=$id]', nil, id: heading['id']).any?, "Lost fragment #{heading['id']} in #{path}"
      end
      old.css('a[href*="assets/docs/"]').each do |link|
        assert current.css('a').any? { |a| a['href'] == link['href'] }, "Lost download #{link['href']}"
      end
    end
  end
end
