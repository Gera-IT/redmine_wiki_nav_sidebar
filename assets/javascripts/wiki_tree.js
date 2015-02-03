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


function reload(){
    $('#left_sidebar').css('display', 'none');
    setTimeout(function(){
        $('#left_sidebar').css('display', 'block');
    }), 400

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

function setCollapseState()
{
    if ($('.main-collapser').attr('data-collapse-state') == "opened")
    {
        $.each($('.sidebar-wrapper > div'), function(ind, el) {
            $(el).addClass("tree-closed");
            $(el).removeClass("opened");
            var id = $(el).attr('class').split("-")[2].split(" ")[0];
            parent_link = $('*[data-parent-id='+ id + ']');
            if (parent_link)
            {
                $(parent_link).html('+')
            }

            $('.main-collapser').attr('data-collapse-state', 'closed');
            setCookie('collapse-state', 'closed', 100);
        });
    }
    else
    {
        $.each($('.sidebar-wrapper > div'), function(ind, el) {
            $(el).addClass("opened");
            $(el).removeClass("tree-closed");
            var id = $(el).attr('class').split("-")[2].split(" ")[0];
            parent_link = $('*[data-parent-id='+ id + ']');
            if (parent_link)
            {
                $(parent_link).html('-')
            }
            $('.main-collapser').attr('data-collapse-state', 'opened');
            setCookie('collapse-state', 'opened', 100);
        });
    }
}

$(function(){

    if ((window.location.href.indexOf("wiki") > -1) && !(window.location.href.indexOf("history") > -1) )
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
                console.log(textStatus);
                console.log(errorThrown);
                $('#left_sidebar').remove();
            }
        });

        setContentClasses();

        //setCollapseState();

        $('.main-collapser').live('click', function(){
            setCollapseState();
        });

        $('.collapser').live('click', function(){
            var lvl = $(this).data('nest-level');
            parent_id = $(this).data('parent-id');
            console.log(lvl);
            console.log($(this).text() == "-");
            if ($(this).text() == "-")
            {
                $('.nest-wrapper-' + parent_id).removeClass('opened');
                $( '.nest-wrapper-' + parent_id ).hide( "fast", function() {
                });
                $(this).text("+");
                setCookie(parent_id, 'tree-closed', 100);
                reload();
            }
            else
            {
                $('.nest-wrapper-' + parent_id).removeClass('tree-closed');
                $( '.nest-wrapper-' + parent_id ).show( "fast", function() {
                });
                setCookie(parent_id, 'opened', 100);
                $(this).text("-")
                reload();
            }
        })
    }

    else if ((window.location.href.indexOf("history") > -1))
    {
    }



});

function submit_diff_form()
{
    var form = $('.sidebar-wrapper').find('form');

        form.submit(function (ev) {
            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: form.serialize(),
                success: function (data) {
                    alert('ok');
                }
            });

            ev.preventDefault();
        });
}

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