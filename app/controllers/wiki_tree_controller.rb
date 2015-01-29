class WikiTreeController < ApplicationController

  before_filter :find_project

  def index
    @title = params[:id]
    @pages = @project.wiki.pages.where(:parent_id => nil).all
    respond_to do |format|
      format.js
    end
  end

  def history
    @page = WikiPage.find_by_title(params[:id])
    @version_count = @page.content.versions.count
    @version_pages = Paginator.new @version_count, 1000, 1
    @versions = @page.content.versions.
        select("id, author_id, comments, updated_on, version").
        reorder('version DESC').
        limit(@version_pages.per_page + 1).
        offset(@version_pages.offset).
        all
    @content = WikiPage.find_by_title(params[:id]).content
  end

  def diff
    @page = WikiPage.find_by_title(params[:id]).content
    @diff = @page.diff(params[:version], params[:version_from])
    render_404 unless @diff
  end

  def wiki_diff
    @page = WikiPage.find_by_title(params[:id])
    @diff = @page.diff(params[:version], params[:version_from])
    respond_to do |format|
      format.js
    end
  end


  private

  def find_project
    @project = Project.find(params[:project_id])
  end


end