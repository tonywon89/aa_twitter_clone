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
      this.renderResults(users);
    }.bind(this),
    error: function(users) {
      console.log("There was an error");
    }
  });
};

UsersSearch.prototype.renderResults = function (users) {
  this.$ul.empty();
  users.forEach(function(user) {
    var $li = $("<li>").text(user.username);
    this.$ul.append($li);
  }.bind(this));
};

module.exports = UsersSearch;
