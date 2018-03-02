//fetch a random quote post

//history api History.pushState()

//submit a new quote with the form using ajax



(function($) {

  //fetch a random quote post on click
  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();

    $.ajax( {
      url: 'wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function( data ) {

        //returns the first post from the array
        var post = data.shift();

        //replace the current quote with the new quote
        $('.entry-content').html( post.content.rendered );
        $( '.entry-title' ).html( '&mdash; ' + post.title.rendered );

        //if the source is available, output it, else output an empty string to fill it
        if ( typeof post._qod_quote_source !== 'undefined') {
          $( '.source' ).html(', <a href="' + post._qod_quote_source_url + '">' + post._qod_quote_source + '</a>');
        
        } else {
          $( '.source' ).text('');
        }

      }
    
    })
  
  })

})(jQuery);




