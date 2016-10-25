$(document).ready(function() {
  init();
});

function init() {

  eventHandlers();
  currentUser();
  allImagesFinder();
  staticStories();
  sponsors();
  followers();
};

var views = [];
function eventHandlers() {
  $('#story-teller').on('click', '.add-new-post',function(){
    var htmlText = $('#add-story-modal').html();
    var output = Mustache.render(htmlText);
    $('#share-more-stories').html(output);
    $('#complete-modal').modal('show');
  });

  $('#share-more-stories').on('click', '.post-now', function(){
    var d = new Date();
    var seconds = d.getTime();
    var htmlText = $('#recently-added-story').html();
    var pic = $('.insert-image-to-post').val();
    var post = $('.write-story').val();
    var mins = minCounter(seconds);
    console.log(mins);
    if(post.length > 0 && pic.length == 0) {
      var view = {
        heading : "Dave Gamache",
        userImage : "https://bootstrap-themes.github.io/application/assets/img/avatar-dhg.png",
        story : post,
        time: mins
      };
      views.push(view);
      $('#complete-modal').modal('hide');
      newStories(htmlText, view);
    }

    if ((pic.length > 0) && (pic.match(/\.(jpeg|jpg|gif|png)$/) != null)) {
      var view = {
        heading : "Dave Gamache",
        userImage : "https://bootstrap-themes.github.io/application/assets/img/avatar-dhg.png",
        story : post,
        image : pic,
        time: mins
      };
      views.push(view);
      $('#complete-modal').modal('hide');
      newStories(htmlText, view);
    }
    else {
      $('.insert-image-to-post').css("borderColor", "red");
      $('.invalid-url').removeClass("invalid-details");
      if(post.length == 0) {
        $('.write-story').css("borderColor", "red");
        $('.invalid-msg').removeClass("invalid-details");
      }
    }
  });
};

function staticStories() {
  var htmlText = $('#recently-added-story').html();
  var storyDetails =
    [
      {
        heading : "Jacob Thornton",
        millisecond : 1477305469596,
        userImage : "https://bootstrap-themes.github.io/application/assets/img/avatar-fat.jpg",
        story : "The phenomena of the physical world collectively, including plants, animals, the landscape, and other features and products of the earth, as opposed to humans or human creations."
      },
      {
        heading : "Mark Otto",
        millisecond : 1477305330596,
        userImage : "https://bootstrap-themes.github.io/application/assets/img/avatar-mdo.png",
        image : "https://bootstrap-themes.github.io/application/assets/img/instagram_10.jpg",
        story : "Having a template for a user story, provides a good guideline."
      },
    ];
    var view = [];
    for(var i = 0; i < storyDetails.length ; i++) {
      var minutes = minCounter(storyDetails[i].millisecond);
      data = {
        heading : storyDetails[i].heading,
        time : minutes,
        userImage : storyDetails[i].userImage,
        image : storyDetails[i].image,
        story : storyDetails[i].story
      }
      view.push(data);
      views.push(data);
    }
    $('#complete-modal').hide();
    newStories(htmlText, view);
};

function newStories(htmlInput, view) {
  var output = Mustache.render(htmlInput, view);
  $('#all-new-stories').prepend(output);
  console.log(views);
};

function currentUser() {
  var userDetails = {
    userName : "Dave Gamache",
    userStatus : "I wish i was a little bit taller, i wish i was a baller, wish i had a girl... also.",
    profilePic: "https://bootstrap-themes.github.io/application/assets/img/avatar-dhg.png",
    coverPic: "https://bootstrap-themes.github.io/application/assets/img/iceland.jpg",
    friends: "12M",
    enemy: "10"
  }
  var htmlText = $('#logged-in-user').html();
  var view = {
    coverImage : userDetails.coverPic,
    profilePicture : userDetails.profilePic,
    userName : userDetails.userName,
    userStatus : userDetails.userStatus,
    totalFriends : userDetails.friends,
    totalEnemy : userDetails.enemy
  };
  var output = Mustache.render(htmlText, view);
  $('#current-profile-tile').html(output);
};

function allImagesFinder() {
  var htmlText = $('#all-images').html();
  var view =
  [
    { image : "https://bootstrap-themes.github.io/application/assets/img/instagram_2.jpg" },
    { image : "https://bootstrap-themes.github.io/application/assets/img/instagram_3.jpg" },
    { image : "https://bootstrap-themes.github.io/application/assets/img/instagram_6.jpg" },
    { image : "https://bootstrap-themes.github.io/application/assets/img/instagram_7.jpg" },
    { image : "https://bootstrap-themes.github.io/application/assets/img/instagram_8.jpg" },
    { image : "https://bootstrap-themes.github.io/application/assets/img/instagram_9.jpg" }
  ];
    var output = Mustache.render(htmlText, view);
    $('#show-all-images').append(output);
};

function minCounter(millisecond) {
  var d = new Date();
  var time = Math.floor((d.getTime() - millisecond)/60000);
  if(time < 60) { return time + "m"};
  if(time > 60) { return Math.floor(time/60) + "h"};
  if(time/60 > 24) {return Math.floor(time/(60*24)) + "d"};
  if((time/(60*24)) > 30) { return Math.floor((time/(60*24*30)))};
}

function sponsors() {
  var htmlText = $('#sponsor-details').html();
  var view = {
    userHeading : "Sponsors",
    image : "https://bootstrap-themes.github.io/application/assets/img/instagram_2.jpg",
    heading : "It might be time to visit Iceland.",
    content : "Iceland is so chill, and everything looks cool here.Also, we heard the people are pretty nice.What are you waiting for?",
    buttonText : "Buy a ticket"
  }
  var output = Mustache.render(htmlText, view);
  $('#sponsor-profile-tile').html(output);
};

function followers() {
  var htmlText = $('#follower-details').html();
  var view =
  [
    {
      followerName : "Mark Otto",
      image : "https://bootstrap-themes.github.io/application/assets/img/avatar-mdo.png",
      twitterHandle : "@mdo",
      buttonText : "Follow"
    },
    {
      followerName : "Jacob Thorn",
      image : "https://bootstrap-themes.github.io/application/assets/img/avatar-fat.jpg",
      twitterHandle : "@fat",
      buttonText : "Follow"
    }
  ];
  var output = Mustache.render(htmlText, view);
  $('#follower-profile-tile').html(output);
};
