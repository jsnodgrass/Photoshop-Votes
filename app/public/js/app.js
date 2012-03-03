
$(document).ready(function(){
   showErrors()

  // Click event for new submissions
  $("#new_submission").click(function(){
    $("section.add_photo_form").fadeIn('fast');
    $("div.popup_background").fadeIn('fast');
  })
  $("span.close_box").click(function(){
    $(this).parent().fadeOut('fast');
    $("div.popup_background").fadeOut('fast');
  })


  // events to show and hide current submissions
  $(".images").live('click', function(){
    var fullsize = $(this).find(".fullsize");
    var image = $(this).find(".fullsize > img");
    if(fullsize.is(":hidden")) {
      fullsize.fadeIn();
      $("div.popup_background").fadeIn();
    
      var imagesize = image.width();
      fullsize.css("margin-left",0-(imagesize/2)+'px')
      image.removeAttr('style')
      if(image.height()+35>$(window).height()) {
        image.height($(window).height()-45)
      }
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


