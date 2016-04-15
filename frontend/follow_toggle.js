var FollowToggle = function ($el, options) {
  this.$el = $el;
  this.userId = this.$el.data("user-id") || options.userId;
  this.followState = this.$el.data("initial-follow-state") || options.followState;
  this.render();
  $el.on("click", this.handleClick.bind(this));
};

FollowToggle.prototype.render = function () {

  switch (this.followState) {
  case "followed":
    this.$el.text("Unfollow!");
    break;
  case "following":
    this.$el.text("Following");
    break;
  case "unfollowed":
    this.$el.text("Follow!");
    break;
  case "unfollowing":
    this.$el.text("Unfollowing");
    break;
  }
};

FollowToggle.prototype.handleClick = function (event) {
  event.preventDefault();
  if (this.followState === "unfollowed") {
    this.followState = "following";
    this.render();
    this.$el.prop("disabled", true);
    $.ajax({
      method: "POST",
      url: "/users/" + this.userId + "/follow",
      dataType: "json",
      success: function(follow) {
        this.followState = "followed";
        this.render();
        this.$el.prop("disabled", false);
      }.bind(this),
      error: function(follow) {
        alert("User could not be followed");
        this.$el.prop("disabled", false);
      }
    });
  } else {
    this.followState = "unfollowing";
    this.render();
    this.$el.prop("disabled", true);
    $.ajax({
      method: "DELETE",
      url: "/users/" + this.userId + "/follow",
      dataType: "json",
      success: function(follow) {
        this.followState = "unfollowed";
        this.render();
        this.$el.prop("disabled", false);
      }.bind(this),
      error: function(follow) {
        alert("User could not be unfollowed");
        this.$el.prop("disabled", false);
      }
    });
  }

};




module.exports = FollowToggle;
