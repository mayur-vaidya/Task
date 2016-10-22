$(document).ready(function() {
  $('#story-teller').on('click', 'button.click-to-get-new-stories',function(){
    var htmlText = $('#add-story-modal').html();
    var output = Mustache.render(htmlText);
    $('#share-more-stories').html(output);
    $('#complete-modal').modal('show');
  });

  $('#share-more-stories').on('click', 'button.post-now', function(){
    var htmlText = $('#recently-added-story').html();
    var title = $('.insert-post-heading').val();
    var pic = $('.insert-image-to-post').val();
    var post = $('.write-story').val();
    var view = {
      heading : title,
      story : post,
      image : pic
    }
    var output = Mustache.render(htmlText, view);
    newStories(output, pic);
  });
});

function newStories(htmlInput, pic) {
  $('#all-new-stories').prepend(htmlInput);
};
