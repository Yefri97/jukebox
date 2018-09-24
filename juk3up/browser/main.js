var io = require('socket.io-client');
var Handlebars = require('handlebars');
var parseAddress = require('../views/parseAddress.js');

var socket = io();


function addToList(item) { console.log("addToList"); }

global.sendData = function(videoId, title, channelTitle) {
  var url = 'https://www.youtube.com/watch?v=' + videoId;
  var urlPre = 'http://img.youtube.com/vi/' + videoId + '/0.jpg';
  var data = { url: url, prev: urlPre, videoId: videoId, title: title, channelTitle: channelTitle };
  socket.emit('add song', data);
}

global.createHTML = function(o) {
  var tag = document.createElement(o.label);
  for (var i in o.attr) {
    tag.setAttribute(i, o.attr[i]);
  }
  tag.innerHTML = o.text;
  o.childrens.forEach(function(e) {
    var c = createHTML(e);
    tag.appendChild(c);
  });
  if (o.label == 'button') {
    tag.addEventListener('click', function() {
      sendData(o.videoId, o.title, o.channelTitle);
    });
  }
  return tag;
}

document.addEventListener('DOMContentLoaded', function() {

  if (window.location.pathname === '/') {

    socket.on('added', function(data) {
      addToList(data);
    });

    socket.on('delete', function() {
      console.log('delete on list');
      var t = document.querySelector('#playlist');
      if (t.children.length > 0)
        t.removeChild(t.children[0]);
    });

  } else if (window.location.pathname === '/play') {
    window.socket = socket;

    socket.on('start', function(data) {
      for (var i = 0, f; f = data.playlist[i]; ++i) {
        if (parseAddress(f.url) !== "invalid")
          window.data.push(parseAddress(f.url));
      }
      if (window.data.length > 0) {
        player.loadVideoById(window.data.shift());
      }
    });

    socket.on('added', function(data) {
      if (parseAddress(data.url) !== "invalid") {
        window.data.push(parseAddress(data.url));
        if (player.getPlayerState() < 1) {
          player.loadVideoById(window.data.shift());
        } else {
          var videoId = data.videoId;
          var title = data.title;
          var channelTitle = data.channelTitle;

          var o = {
            label: 'div',
            attr: {
              class: 'row mt-2 mb-2'
            },
            text: '',
            childrens: [{
              label: 'div',
              attr: {
                class: 'col-6'
              },
              text: '',
              childrens: [{
                label: 'img',
                attr: {
                  class: 'img-fluid',
                  src: 'http://img.youtube.com/vi/' + videoId + '/0.jpg'
                },
                text: '',
                childrens: []
              }]
            }, {
              label: 'div',
              attr: {
                class: 'col-6',
                style: 'padding-left: 0px',
              },
              text: '',
              childrens: [{
                label: 'h6',
                attr: {
                  class: 'title-song',
                },
                text: '',
                childrens: [{
                  label: 'small',
                  attr: {
                    class: 'font-weight-bold',
                  },
                  text: title,
                  childrens: []
                }]
              }, {
                label: 'small',
                attr: {
                  class: 'font-weight-light d-inline-block text-truncate',
                  style: 'max-width: 100%'
                },
                text: channelTitle,
                childrens: []
              }, {
                label: 'br',
                attr: {},
                text: '',
                childrens: []
              }, {
                label: 'a',
                attr: {
                  class: 'btn btn-info btn-sm'
                },
                text: 'Calificación ' + Math.floor(Math.random() * 6.0),
                childrens: []
              }]
            }]
          };
          var h = createHTML(o);
          $("#playlist").append(h);
        }
      }
    });

    socket.on('delete', function() {
      console.log('delete on player');
      window.data.shift();
    });
  }

});
