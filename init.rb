require 'assets_hook'
require 'redmine'

Redmine::Plugin.register :redmine_wiki_nav_sidebar do
  name 'Redmine Wiki nav sidebar plugin'
  author 'Alex Sinelnikov'
  description 'Tree Like structure for wiki pages with sidebar'
  version '1.0b'
  url 'https://github.com/Gera-IT/redmine_wiki_nav_sidebar'
  author_url 'https://github.com/avdept'
  settings :default => {'enabled_sidebar' => true}, :partial => 'settings/sidebar_setting'
end

class FilesHook < Redmine::Hook::ViewListener
  def view_layouts_base_html_head(context = { })
    javascript_include_tag('wiki_tree.js', :plugin => 'redmine_wiki_nav_sidebar') +
        stylesheet_link_tag('wiki_tree.css', :plugin => 'redmine_wiki_nav_sidebar')
  end
end


