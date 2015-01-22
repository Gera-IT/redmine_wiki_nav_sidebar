$(function(){


    project_id = $('form').first().attr('action').replace( /\/projects\//, '' );
    project_id = project_id.replace( /\/search/, '' );


    $('#main').prepend('<div id="left_sidebar"><h3>Wiki Pages</h3></div>');

    $.ajax({
        url: "/wiki_tree.js",
        data: {project_id: project_id},
        dataType: 'script',
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('error while loading wiki pages');
            $('#left_sidebar').remove();
        }
    })



});