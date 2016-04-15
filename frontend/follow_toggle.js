var FollowToggle = function ($el) {
  this.$el = $el;
  this.userId = $el.data("user-id");
  this.followState = $el.data("initial-follow-state");
  this.render();
  $el.on("click", this.handleClick.bind(this));
};

FollowToggle.prototype.render = function () {

  if (this.followState === "followed"){
    this.$el.text("Unfollow!");
  }else {
    this.$el.text("Follow!");
  }
};

FollowToggle.prototype.handleClick = function (event) {
  event.preventDefault();
  if (this.followState === "unfollowed") {
    $.ajax({
      method: "POST",
      url: "/users/" + this.userId + "/follow",
      dataType: "json",
      success: function(follow) {
        this.followState = "followed";
        this.render();
      }.bind(this),
      error: function(follow) {
        alert("User could not be followed");
      }
    });
  } else {
    $.ajax({
      method: "DELETE",
      url: "/users/" + this.userId + "/follow",
      dataType: "json",
      success: function(follow) {
        this.followState = "unfollowed";
        this.render();
      }.bind(this),
      error: function(follow) {
        alert("User could not be unfollowed");
      }
    });
  }

};

module.exports = FollowToggle;
