jQuery(function ($) {

    'use strict';

    /* ======= Toggle Click on <a> tag mobie menu======= */
    (function () {
        $(document).on('click','.navbar-collapse.in',function(e) {
            if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
                $(this).collapse('hide');
            }
        });


    }());

    /* ======= Contact Form ======= */
    (function () {

        $('#contactForm').on('submit',function(e){
            e.preventDefault();

            var $action = $(this).prop('action');
            var $data = $(this).serialize();
            var $this = $(this);

            $this.prevAll('.alert').remove();

            $.post( $action, $data, function( data ) {

                if( data.response=='error' ){

                    $this.before( '<div class="alert alert-danger">'+data.message+'</div>' );
                }

                if( data.response=='success' ){

                    $this.before( '<div class="alert alert-success">'+data.message+'</div>' );
                    $this.find('input, textarea').val('');
                }

            }, "json");

        });
    }());

}); // JQuery end