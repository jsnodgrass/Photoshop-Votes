
$(document).ready(function(){
   showErrors()

  // Click event for new submissions
  $("#new_submission, div.no_submissions").click(function(){
    $("section.add_photo_form").fadeIn('fast');
    $("div.popup_background").fadeIn('fast');
  })
  $("span.close_box").click(function(){
    $(this).parent().fadeOut('fast');
    $("div.popup_background").fadeOut('fast');
  })


  // events to show and hide current submissions
  $(".images, .my_images").live('click', function(){
    var fullsize = $(this).find(".fullsize");
    var image = $(this).find(".fullsize > img");
    if(fullsize.is(":hidden")) {
      fullsize.fadeIn();
      $("div.popup_background").fadeIn();
    
      var image_width = image.width();
      var image_height = image.height();
      var win_height = $(window).height();
      var win_width = $(window).width();
      var h_diff, w_diff;
      image.removeAttr('style')

      if(image_height+35 > win_height) {
        h_diff = (image_height+45)-win_height;
      } 
      if(image_width+300 > win_width) {
        w_diff = (image_width+300)-win_width;
      } 

      if(h_diff && w_diff) {
        if(h_diff>w_diff) {
          image.height(win_height-45);
        } else {
          image.width(win_width-300);
        }
      } else if (h_diff && !w_diff) {
        image.height(win_height-45);
      } else if (w_diff && !h_diff) {
        image.width(win_width-300);
      }
      fullsize.css("margin-left",0-(image.width()/2)+'px')
      fullsize.css("margin-top",0-(image.height()/2)+'px')
      // if(image.height()+35>$(window).height()) {
      //   image.height($(window).height()-45)
      // }
    }
  })
  $("div.popup_background, div.fullsize>img").click(function() {
    $(".fullsize").fadeOut();
    $(".modal").fadeOut('fast');
    $("div.popup_background").fadeOut();
  })  


})

function showErrors() {
  $("#messages").height(45);
  setTimeout(function(){
    $("#messages").height(0)
  },3000)  
}


