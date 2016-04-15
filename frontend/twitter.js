var FollowToggle = require("./follow_toggle");
var UsersSearch = require("./users_search");
var TweetCompose = require("./tweet_compose");

$(function(){
  $("button.follow-toggle").each(function(idx, button){
    new FollowToggle($(button));
  });
  $("nav.users_search").each(function(idx, nav) {
    new UsersSearch($(nav));
  });
  new TweetCompose();
});
