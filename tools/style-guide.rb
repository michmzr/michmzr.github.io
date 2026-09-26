# frozen_string_literal: true

require 'yaml'
require 'erb'
require 'digest'
require 'cgi'

# No Jekyll build or additional gems are needed to inspect the design system.
class StyleGuide
  PROPERTIES = {
    'backgroundColor' => 'background-color', 'textColor' => 'color',
    'rounded' => 'border-radius', 'padding' => 'padding',
    'height' => 'height', 'width' => 'width', 'size' => 'font-size',
    'fontFamily' => 'font-family', 'fontSize' => 'font-size',
    'fontWeight' => 'font-weight', 'lineHeight' => 'line-height',
    'letterSpacing' => 'letter-spacing', 'fontFeature' => 'font-feature-settings',
    'fontVariation' => 'font-variation-settings'
  }.freeze

  def initialize(root = File.expand_path('..', __dir__))
    @root = root
  end

  def read(path)
    File.read(File.join(@root, path), encoding: 'UTF-8')
  end

  def h(value)
    CGI.escapeHTML(value.to_s)
  end

  def resolve(value, trail = [])
    return value unless value.is_a?(String) && value.match?(/\A\{[^{}]+\}\z/)

    path = value[1...-1]
    raise "Circular token reference: #{path}" if trail.include?(path)

    result = path.split('.').reduce(@tokens) { |group, key| group.fetch(key) }
    resolve(result, trail + [path])
  end

  def css_value(value)
    value = resolve(value).to_s
    raise "Unsafe CSS token: #{value}" if value.match?(/[;{}<>\n\r]/)

    value
  end

  def declarations(properties)
    properties.flat_map do |key, value|
      if key == 'typography'
        declarations(resolve(value))
      else
        property = PROPERTIES.fetch(key)
        value = css_value(value)
        value = "#{value}, system-ui, sans-serif" if key == 'fontFamily' && value == 'Inter'
        "#{property}: #{value};"
      end
    end.join(' ')
  end

  def token_css
    variables = %w[colors spacing rounded].flat_map do |group|
      @tokens.fetch(group).map { |key, value| "  --#{group}-#{key}: #{css_value(value)};" }
    end
    mobile = @tokens.fetch('typography').fetch('display-mobile')
    variables << "  --mobile-display-size: #{css_value(mobile.fetch('fontSize'))};"
    variables << "  --mobile-display-leading: #{css_value(mobile.fetch('lineHeight'))};"
    rules = %w[typography components].flat_map do |group|
      attribute = group == 'typography' ? 'type' : 'component'
      @tokens.fetch(group).map do |key, properties|
        raise "Invalid token name: #{key}" unless key.match?(/\A[a-z][a-z0-9-]*\z/)
        selectors = ["[data-#{attribute}=\"#{key}\"]"]
        if group == 'components' && key.end_with?('-hover')
          base = key.sub(/-hover\z/, '')
          selectors += %w[hover active].map { |state| "[data-component=\"#{base}\"]:#{state}:not(:disabled)" }
        end
        "#{selectors.join(', ')} { #{declarations(properties)} }"
      end
    end
    ":root {\n#{variables.join("\n")}\n}\n#{rules.join("\n")}"
  end

  def fingerprint
    paths = ['docs/DESIGN.md', 'tools/style-guide.rb'] +
            Dir.glob(File.join(@root, 'tools/style-guide/*')).map { |path| path.delete_prefix(@root + '/') } +
            Dir.glob(File.join(@root, '_sass/cybershu/*.scss')).map { |path| path.delete_prefix(@root + '/') } +
            %w[assets/js/site.js assets/js/discovery.js]
    Digest::SHA256.hexdigest(paths.sort.map { |path| path + "\0" + read(path) }.join("\0"))
  end

  # Production partials deliberately contain plain CSS, so specimens share them
  # without requiring Sass or a Jekyll build. Font URLs are relative to docs/.
  def production_specimen
    styles = %w[foundation shell content controls].map { |name| read("_sass/cybershu/#{name}.scss") }.join("\n")
    styles = styles.gsub('../fonts/', '../assets/fonts/')
    read('tools/style-guide/website.html').sub('PRODUCTION_STYLES', styles)
      .sub('PRODUCTION_SCRIPTS', read('assets/js/site.js') + "\n" + read('assets/js/discovery.js'))
  end

  def render
    source = read('docs/DESIGN.md')
    frontmatter = source.match(/\A---\r?\n(.*?)\r?\n---\r?\n/m)
    raise 'DESIGN.md must start with YAML front matter' unless frontmatter

    @tokens = YAML.safe_load(frontmatter[1])
    css = token_css
    digest = fingerprint
    ERB.new(read('tools/style-guide/page.html.erb')).result(binding)
       .lines
       .map { |line| line.rstrip + (line.end_with?("\n") ? "\n" : "") }
       .join
  end

  def run(check: false)
    output = File.join(@root, 'docs/style-guide.html')
    content = render
    current = File.exist?(output) ? File.read(output, encoding: 'UTF-8') : nil
    if check
      raise 'Outdated docs/style-guide.html. Run: pnpm style-guide:build' unless current == content
      puts 'Style guide: up to date.'
    elsif current != content
      File.write(output, content)
      puts 'Generated docs/style-guide.html'
    end
  end
end

if $PROGRAM_NAME == __FILE__
  begin
    raise 'Usage: ruby tools/style-guide.rb [--check | --watch]' unless [[], ['--check'], ['--watch']].include?(ARGV)
    guide = StyleGuide.new
    guide.run(check: ARGV.include?('--check'))
    if ARGV.include?('--watch')
      puts 'Watching DESIGN.md and preview sources. Press Ctrl+C to stop.'
      previous = guide.fingerprint
      loop do
        sleep 0.75
        begin
          current = guide.fingerprint
          next if current == previous
          guide.run
          previous = current
        rescue StandardError => error
          warn error.message
        end
      end
    end
  rescue Interrupt
    exit 0
  rescue StandardError => error
    warn error.message
    exit 1
  end
end
