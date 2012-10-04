/*
 *	Infinite Scroll Plugin
 *	Requires jQuery library (http://www.jquery.com) and jQuery Class plug-in
 *
 *	Fatih Erikli (fatih at hipo dot biz) - July 31, 2012
 */


$.namespace("hipo.InfinityScroll");

patio_guide.InfinityScroll = $.Class.extend({

    loader_image : "",
    content_selector : "",
    pagination_selector : ".pagination",
    next_link_selector : ".pagination a.next",
    on_page_load : function () {},

    loader : null,

    FOOTER_POSITION_THRESHOLD : 60,
    MOBILE_FOOTER_POSITION_THRESHOLD : 600,

    init : function (options) {

        $.extend(this, options);

        this.hide_pagination();
        this.check_scroll(this.load_page.bind(this));
        this.prepare_loader();

    },

    load_content : function (response) {

        var content = $(this.content_selector, response).html();
        $(this.content_selector).append(content);

    },

    load_page : function () {

        var next_page = this.get_next_page();

        if (next_page) {

            this.remove_pagination();
            this.show_loader();

            var paginate = function (response) {
                this.load_content(response);
                this.hide_pagination();
                this.hide_loader();

                // events
                this.on_page_load();
            };

            $.get(next_page, paginate.bind(this), 'html');

        }

    },

    get_next_page : function () {

        if ($(this.next_link_selector).length) {
            return $(this.next_link_selector).attr("href");
        } else {
            return false;
        }

    },

    check_scroll : function (callback) {

        $(window).scroll(function() {

            if  ($(window).scrollTop() + $(window).height() >
                this.get_doc_height() - this.get_footer_threshold() ) {
                callback();
            }

        }.bind(this));

    },

    hide_pagination : function () {

        $(this.pagination_selector).hide()

    },

    remove_pagination : function () {

        $(this.pagination_selector).remove()

    },

    prepare_loader : function () {

        this.loader = $("<div>").css({
            "display": "none",
            "text-align": "center",
            "padding": "10px",
            "clear": "both"
        }).append($("<img>", {
            "src": this.loader_image
        }));

        $(this.content_selector).after(this.loader);

    },

    show_loader : function () {

        this.loader.show();
    },

    hide_loader : function () {

        this.loader.hide();

    },

    get_footer_threshold : function () {

        return this.is_mobile_device() ?
            this.MOBILE_FOOTER_POSITION_THRESHOLD : this.FOOTER_POSITION_THRESHOLD;

    },

    get_doc_height : function () {

        var D = document;

        return Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );

    },

    is_mobile_device : function () {

        return navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android)/);

    }

});