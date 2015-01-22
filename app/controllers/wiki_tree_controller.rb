class WikiTreeController < ApplicationController

  before_filter :find_project

  def index
    @pages = WikiPage.where(:parent_id => nil).all
    respond_to do |format|
      format.js
    end
  end


  private

  def find_project
    @project = Project.find(params[:project_id])
  end


end