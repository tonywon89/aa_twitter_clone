var FollowToggle = function ($el) {
  this.$el = $el;
  this.userId = $el.data("user-id");
  this.followState = $el.data("initial-follow-state");
  this.render();
  $el.on("click", this.handleClick.bind(this));
};

FollowToggle.prototype.render = function () {

  // if (this.followState === "followed"){
  //   this.$el.text("Unfollow!");
  // }else {
  //   this.$el.text("Follow!");
  // }
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
