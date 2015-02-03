# Plugin's routes
# See: http://guides.rubyonrails.org/routing.html

resources :wiki_tree, only: :index
# get 'wiki_history', to: "wiki_tree#history"
#
# get '/projects/:project_id/wiki/:id/:version/wiki_diff', to: 'wiki_tree#wiki_diff', as: :wiki_diff_page
# get '/projects/:project_id/wiki/:id/wiki_diff', to: 'wiki_tree#wiki_diff', as: :wiki_diff_page