var FollowToggle = require("./follow_toggle");

$(function(){
  $("button.follow-toggle").each(function(idx, button){
    new FollowToggle($(button));


    // console.log(buton);
  });
});
