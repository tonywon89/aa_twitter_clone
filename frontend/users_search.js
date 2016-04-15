var FollowToggle = require("./follow_toggle");

var UsersSearch = function($el){
  this.$el = $el;
  this.$input = $el.find("#user-search-input");

  this.$ul = $el.find("ul.users");
  this.$input.on("input", this.handleInput.bind(this));
};

UsersSearch.prototype.handleInput = function(event) {

  $.ajax({
    url: "/users/search",
    type: "GET",
    data: { query: this.$input.val() },
    dataType: "json",
    success: function(users) {
      console.log(users);
      this.renderResults(users);
    }.bind(this),
    error: function(users) {
      console.log("There was an error");
    }
  });
};

UsersSearch.prototype.renderResults = function (users) {
  console.log(this.$ul);
  this.$ul.empty();
  console.log(this.$ul);

  users.forEach(function(user) {
    var $li = $("<li>").text(user.username);
    var $button = $("<button>");

    var followedText = user.followed ? "followed" : "unfollowed";
    new FollowToggle($button, { userId: user.id, followState: followedText});

    $li.append($button);
    this.$ul.append($li);
  }.bind(this));
};

module.exports = UsersSearch;
