
(function($) {

  var lastPage='';
  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();

    $.ajax( {
      url: '/quotes_on_dev/wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function( data ) {

        //returns the first post from the array
        var post = data.shift();
        
        //replace the current quote with the new quote
        $('.entry-content').html( post.content.rendered );
        $( '.entry-title' ).html( '&mdash; ' + post.title.rendered );

        //if the source is available, output it, else output an empty string to fill it
        if ( post._qod_quote_source !== '' && post._qod_quote_source_url !== '') {
          $( '.source' ).html(', <a href="' + post._qod_quote_source_url + '">' + post._qod_quote_source + '</a>');
        
        } 
        else if (post._qod_quote_source !== '') {
          $( '.source' ).text(', ' + post._qod_quote_source);
        }

        else {
          $( '.source' ).text('');
        }

        history.pushState(null, null, post.link);
        console.log(post.link);
      }
    
    })
  
  })

  $(window).on('popstate', function() {

    if (window.location.hash.indexOf('qm-overview') === 1) {
      return false;
    }else {
      window.location.replace(lastPage);
    }
  
  });


//**  SUBMIT BUTTON **/

  $('#submit-quote').on('click', function(event) {
    event.preventDefault();

    var name = $('#quote-author').val();
    var contentForm = $('#quote-content').val();
    var sourceForm = $('#quote-source').val();
    var sourceUrl = $('#quote-source-url').val();

      $.ajax({
        method: 'post',
        url: api_vars.root_url + 'wp/v2/posts/',
        data: {
            title: name,
            content: contentForm,
            _qod_quote_source: sourceForm,
            _qod_quote_source_url: sourceUrl,
            status: "publish"
        },
        
        beforeSend: function(xhr) {
          xhr.setRequestHeader( 'X-WP-Nonce', api_vars.nonce );
        }
       
      }).done( function() {
        $('#quote-submission-form').hide();
        $('.submit-success-message').after( '<p>' + api_vars.success + '</p>' );
        
      }).always(function() {
        $('#quote-submission-form').trigger('reset');
      
      }).fail(function() {
        $('#submit-quote').after( '<p>' + api_vars.failure + '</p>' );
        
      })

    });
  
  })(jQuery);




