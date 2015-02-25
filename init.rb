require 'assets_hook'
require 'redmine'
require 'wiki_pages_patch'

Redmine::Plugin.register :redmine_wiki_nav_sidebar do
  name 'Redmine Wiki nav sidebar plugin'
  author 'Alex Sinelnikov'
  description 'Tree Like structure for wiki pages with sidebar'
  version '1.0'
  url 'https://github.com/Gera-IT/redmine_wiki_nav_sidebar'
  author_url 'https://github.com/avdept'
  settings :default => {'enabled_sidebar' => true}, :partial => 'settings/sidebar_setting'
end

ActionDispatch::Callbacks.to_prepare do

  WikiPage.send(:include, WikiPagesPatch)
end

class AssetsFilesHook < Redmine::Hook::ViewListener
  def view_layouts_base_html_head(context = { })
    javascript_include_tag('wiki_tree.js', :plugin => 'redmine_wiki_nav_sidebar') +
        javascript_include_tag('jquery.mjs.nestedSortable.js', :plugin => 'redmine_wiki_nav_sidebar') +
        stylesheet_link_tag('wiki_tree.css', :plugin => 'redmine_wiki_nav_sidebar')
  end
end


