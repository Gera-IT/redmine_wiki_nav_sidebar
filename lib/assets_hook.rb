class FilesHook < Redmine::Hook::ViewListener
  def view_layouts_base_html_head(context = { })
    javascript_include_tag('wiki_tree.js', :plugin => 'redmine_wiki_nav_sidebar')
  end
end