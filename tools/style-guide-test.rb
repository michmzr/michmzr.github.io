# frozen_string_literal: true

require 'minitest/autorun'
require 'tmpdir'
require 'fileutils'
require_relative 'style-guide'

class StyleGuideTest < Minitest::Test
  def setup
    @root = Dir.mktmpdir('cybershu-style-guide-')
    FileUtils.mkdir_p(File.join(@root, 'docs'))
    FileUtils.mkdir_p(File.join(@root, 'tools'))
    FileUtils.cp(File.expand_path('../docs/DESIGN.md', __dir__), File.join(@root, 'docs'))
    FileUtils.cp(File.join(__dir__, 'style-guide.rb'), File.join(@root, 'tools'))
    FileUtils.cp_r(File.join(__dir__, 'style-guide'), File.join(@root, 'tools'))
    @guide = StyleGuide.new(@root)
    @output = File.join(@root, 'docs/style-guide.html')
    @source = File.join(@root, 'docs/DESIGN.md')
  end

  def teardown
    FileUtils.remove_entry(@root)
  end

  def change_source(from, to)
    File.write(@source, File.read(@source).sub(from, to))
  end

  def test_detects_stale_tokens_then_regenerates_components_and_swatches
    @guide.run
    change_source('#FF6B35', '#DD6633')
    assert_raises(RuntimeError) { @guide.run(check: true) }
    @guide.run
    html = File.read(@output)
    assert_includes html, '--colors-accent: #DD6633;'
    assert_includes html, 'background-color: #DD6633;'
    assert_includes html, '<code>#DD6633</code>'
    @guide.run(check: true)
  end

  def test_detects_prose_and_template_drift
    @guide.run
    File.open(@source, 'a') { |file| file.puts '\nNew design rule.' }
    assert_raises(RuntimeError) { @guide.run(check: true) }
    @guide.run
    File.open(File.join(@root, 'tools/style-guide/base.css'), 'a') { |file| file.puts '/* revised */' }
    assert_raises(RuntimeError) { @guide.run(check: true) }
  end

  def test_invalid_reference_keeps_last_valid_preview
    @guide.run
    original = File.read(@output)
    change_source('{colors.accent}', '{colors.missing}')
    assert_raises(KeyError) { @guide.run }
    assert_equal original, File.read(@output)
  end

  def test_rejects_css_injection
    change_source('fontFamily: Inter', 'fontFamily: "Inter; color: red"')
    assert_raises(RuntimeError) { @guide.render }
    refute File.exist?(@output)
  end

  def test_mobile_type_and_real_hover_follow_component_tokens
    change_source('fontSize: 2rem', 'fontSize: 2.25rem')
    html = @guide.render
    assert_includes html, '--mobile-display-size: 2.25rem;'
    assert_includes html, '[data-component="button-primary"]:hover:not(:disabled)'
  end

  def test_render_is_deterministic
    assert_equal @guide.render, @guide.render
  end
end
