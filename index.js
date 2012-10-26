$(document).scroll(function(){
  // If has not activated (has no attribute "data-top"
  if (!$('.subnav').attr('data-top')) {
    // If already fixed, then do nothing
    if ($('.subnav').hasClass('subnav-fixed')) return;
    // Remember top position
    var offset = $('.subnav').offset()
    $('.subnav').attr('data-top', offset.top);
  }

  if ($('.subnav').attr('data-top') - $('.subnav').outerHeight() <= $(this).scrollTop())
    $('.subnav').addClass('subnav-fixed');
  else
    $('.subnav').removeClass('subnav-fixed');
});

function isPushEvent(event){
  return ("PushEvent" == event.type);
}

$(function() {
  var twitterApiUrl = "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=thebignet&count=5&callback=?";
  $.getJSON(twitterApiUrl, function(data) {
    $(".tweets").html(_.template($("#twitter-template").html(), {data: data}));
  });

  var githubApiUrl = "https://github.com/thebignet.json?callback=?";
  $.getJSON(githubApiUrl, function(data) {
    var filtered = data.filter(isPushEvent);
    filtered.length=5;
    $(".github").html(_.template($("#github-template").html(), {data: filtered}));
  });

});