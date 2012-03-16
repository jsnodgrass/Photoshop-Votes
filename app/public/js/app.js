

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

      console.log(image_height);
      console.log(image.height());
      // console.log(image.width());

      if(image.height()+35 > $(window).height()) {
        h_diff = (image.height()+45)-$(window).height();
      } 
      if(image.width()+300 > $(window).width()) {
        w_diff = (image.width()+300)-$(window).width();
      } 

      if(h_diff && w_diff) {
        if(h_diff>w_diff) {
          image.height($(window).height()-45);
        } else {
          image.width($(window).width()-300);
        }
      } else if (h_diff && !w_diff) {
        image.height($(window).height()-45);
      } else if (w_diff && !h_diff) {
        image.width($(window).width()-300);
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

  // $('.images').bind('remove',function(){
  //   var next = $(this).next();

  //   next.css('opacity', 0);
  //   next.next().css('opacity', 0);

  //   setTimeout(function(){
  //     next.animate({'opacity':1},{duration:250,queue:false});
  //     next.next().animate({'opacity':1},{duration:250,queue:false});
  //   },500)

  // })

  // $(".images").change('position',function(){
  //   console.log("changed something");
  // })

})

function showErrors() {
  $("#messages").height(45);
  setTimeout(function(){
    $("#messages").height(0)
  },3000)  
}


