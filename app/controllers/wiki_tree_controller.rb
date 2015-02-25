class WikiTreeController < ApplicationController

  before_filter :find_project

  def index
    @title = params[:id]
    @pages = @project.wiki.pages.where(:parent_id => nil).reorder("position ASC").all
    respond_to do |format|
      format.js
    end
  end

  def update_positions
    sorted_params = prepare_positions_hash
    sorted_params.each_pair do |key, val|
      val.each_with_index do |item, index|
        p item
        p index
        WikiPage.find(item.to_i).set_list_position(index + 1)
      end
      if key.present?
        WikiPage.where(:id => val).update_all(:parent_id => key.to_i)
      end
    end
    respond_to do |format|
        format.json { head :ok }
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
    @wiki = @project.wiki
    @page = @wiki.find_or_new_page(params[:id])
    # @page = WikiPage.find_by_title(params[:id])
    @diff = @page.diff(params[:version], params[:version_from])
    respond_to do |format|
      format.js
    end
  end


  private

  def prepare_positions_hash
    sorted_hash = {}
    data = params[:data]
    data.each_pair do |key, val|
      next if val["item_id"].empty?
      sorted_hash[val["parent_id"]].kind_of?(Array) ? sorted_hash[val["parent_id"]] << val["item_id"] : sorted_hash[val["parent_id"]] = [val["item_id"]]
    end
    sorted_hash
  end

  def find_project
    @project = Project.find(params[:project_id])
  end


end