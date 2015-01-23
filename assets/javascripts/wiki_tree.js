function hideLeftSideBar()
{
    if ($('#left_sidebar').is(':visible')) {
        $('#left_sidebar').addClass('sidebar_hidden');

        $('#content').css('margin-left', '0px');
        $('#hideleftSidebarButton').addClass('sidebar_hidden');
        setCookie('left_sidebar_hide', 'hide', 100);
        $('#content').removeClass('content-closed');
        $('#content').addClass('content-opened');
    } else {
        $('#left_sidebar').removeClass('sidebar_hidden');

        $('#content').css('margin-left', '300px');
        $('#hideleftSidebarButton').removeClass('sidebar_hidden');
        setCookie('left_sidebar_hide', 'show', 100);
        $('#content').addClass('content-closed');
        $('#content').removeClass('content-opened');
    }
}


function setContentClasses()
{
    if ($('#left_sidebar').is(':visible')) {
        $('#content').removeClass('content-closed');
        $('#content').addClass('content-opened');
    } else {
        $('#content').addClass('content-closed');
        $('#content').removeClass('content-opened');
    }
}
$(function(){

    if (window.location.href.indexOf("wiki") > -1)
    {
        project_id = $('form').first().attr('action').replace( /\/projects\//, '' );
        project_id = project_id.replace( /\/search/, '' );

        arr = window.location.href.replace("/edit", "");
        arr = arr.split("/");
        id = arr[arr.length - 1];

        $.ajax({
            url: "/wiki_tree.js",
            data: {project_id: project_id, id: id},
            dataType: 'script',
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log('error while loading wiki pages');
                $('#left_sidebar').remove();
            }
        });

        setContentClasses();

        $('.main-collapser').live('click', function(){
            if ( $('.sidebar-wrapper').css('visibility') == 'hidden' )
                $('.sidebar-wrapper').css('visibility','visible');
            else
                $('.sidebar-wrapper').css('visibility','hidden');
        });

        $('.collapser').live('click', function(){
            var lvl = $(this).data('nest-level');
            parent_id = $(this).data('parent-id');
            console.log(lvl);
            console.log($(this).text() == "-");
            if ($(this).text() == "-")
            {
                $('.nest-wrapper-' + parent_id).addClass('closed');
                $('.nest-wrapper-' + parent_id).removeClass('opened');
                $(this).text("+");
                setCookie(parent_id, 'closed', 100);
            }

            else

            {

                $('.nest-wrapper-' + parent_id).addClass('opened');
                $('.nest-wrapper-' + parent_id).removeClass('closed');
                setCookie(parent_id, 'opened', 100);
                $(this).text("-")
            }

            console.log('hi');
        })
    }



});


function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value + ";path=/";
}

function getCookie(c_name) {
    var i;
    var x;
    var y;
    var ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name)
            return unescape(y);
    }
}