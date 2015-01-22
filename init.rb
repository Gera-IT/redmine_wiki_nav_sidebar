require 'assets_hook'
require 'redmine'




Redmine::Plugin.register :redmine_wiki_nav_sidebar do
  name 'Redmine inline issues edit plugin'
  author 'Alex Sinelnikov'
  description 'Inline edit for fields on tasks list'
  version '1.0b'
  url 'https://github.com/avdept/redmine_edit_issues_inline'
  author_url 'https://github.com/avdept'

  # settings :default => {'inline_issues_information' => '1'}, :partial => 'settings/inline_information'
  # settings :default => {'enable_inline_edit' => '1'}, :partial => 'settings/inline_information'
  #
  # project_module :inline_edit do
  #   permission :allow_inline_edit, :issues_inline => :update_inline
  # end




end


class FilesHook < Redmine::Hook::ViewListener
  def view_layouts_base_html_head(context = { })
    javascript_include_tag('wiki_tree.js', :plugin => 'redmine_wiki_nav_sidebar') +
        stylesheet_link_tag('wiki_tree.css', :plugin => 'redmine_wiki_nav_sidebar')
  end
end


