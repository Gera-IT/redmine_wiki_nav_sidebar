require_dependency 'wiki_page'

module WikiPagesPatch
  def self.included(base)
    base.class_eval do
      unloadable
      acts_as_list :scope => :parent_id
    end

  end

end