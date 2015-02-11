# Redmine wiki navigational sidebar

### Description

This plugin adds new sidebar on wiki pages, with full tree of wiki pages to current project with link, allowing to visit any page without doing anything, but click on link.

### Installation

Please follow official plugin installation guide


### Themes & Compatibility

Due to redmine layout structure - there are only 2 pieces - main content & sidebar. And because different themes have completely different css, you might need to add some css to make sure your theme will show left sidebar correctly. Currently only 2 themes are supported - `A1` and `Circle`. 

To add support for your theme - go to `app/views/wiki_tree/_styles.html.erb` and add your css code. Class `.content-opened` adds to `#container` when sidebar is hidden, and `.content-closed` only when sidebar is visible. Most likely you will have to add css to these classes too.

###Screenshots

![Imgur](http://i.imgur.com/V402KnM.png)

###Contributing

If you have found some bugs, or added some new css for another theme, submit pull request.
