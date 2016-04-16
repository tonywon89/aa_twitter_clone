var TweetCompose = function () {

  this.$form = $(".tweet-compose");
  this.$form.data("tweets-ul", "#feed");
  this.$form.on("submit", this.submit.bind(this));
  this.$charsLeft = $(".chars-left");
  this.$content = this.$form.find("textarea");
  this.$content.on("input", function(event) {

    var chars = this.$content.val().length;
    var cLeft = parseInt(this.$charsLeft.data("max-length")) - chars;
    this.$charsLeft.text(cLeft);

  }.bind(this));

  this.$form.find("a.add-mentioned-user").click(this.addMentionedUser.bind(this));

  this.$form.find(".mentioned-users").on("click", "a.remove-mentioned-user", this.removeMentionedUser);


};

TweetCompose.prototype.removeMentionedUser = function (event) {
  event.preventDefault();
  event.currentTarget.parentElement.remove();

};
TweetCompose.prototype.addMentionedUser = function (event) {
  event.preventDefault();
  $(".mentioned-users").append($('script').html());


};

TweetCompose.prototype.submit = function (event) {
  event.preventDefault();
  var formValues = this.$form.serializeJSON();

  $(":input").prop("disabled", true);

  $.ajax({
    type: "POST",
    url:"/tweets",
    data: formValues,
    dataType: 'json',
    success: function(tweet){
      this.clearInputs();
      this.handleSuccess(tweet);
    }.bind(this)

  });
};

TweetCompose.prototype.clearInputs = function () {
  $("textarea").val("");
  $("select").prop("selectedIndex", 0);
  $(":input").prop("disabled", false);
};

TweetCompose.prototype.handleSuccess = function(tweet) {
  var $a = $('<a>').prop("href", "/users/" + tweet.user_id);
  $a.text(tweet.user.username);
  var $li = $('<li>').append(tweet.content + " -- " + $a[0].outerHTML +
                              " -- " + tweet.created_at);

  var feed = this.$form.data("tweets-ul");

  $(feed).prepend($li);
};


module.exports = TweetCompose;
