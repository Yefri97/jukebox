var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED)
    nextSong();
}

function nextSong() {
  var cnt = $("#playlist > div").length;
  if (cnt > 0) {
    var id = $("#playlist div:first").find(".videoId").text();
    player.loadVideoById(id);
    $("#playlist div:first").remove();
  }
}
