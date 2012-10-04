Hipo InfiniteScroll
===================

The documentation will be ready soon.


Example of Usage
================

    <script src="js/jquery.class.min.js"></script>
    <script src="js/hipo.infinityscroll.min.js"></script>

    <script>
        $(function () {
            new hipo.InfinityScroll({
                "loader_image" : "images/loader.gif",
                "pagination_selector": ".pagination",
                "next_link_selector" : ".pagination a.next",
                "content_selector": "#product-list"
            });
        });
    </script>

Available Options
=================

### loader_image
An image that appears in loading process.

### pagination_selector
The selector of pagination element.

### next_link_selector
The selector of next page anchor.

### content_selector
Container element of paginated items.

### on_page_load
A callback function that is fired at each ajax request.
That allows you to update gui behavior of loaded content as dynamically.


Sites using InfiniteScroll
==========================

 - <http://patios.blogto.com>

If you are using InfiniteScroll, you can submit your site via pull request.