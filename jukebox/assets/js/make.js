function createHTML(o) {
  var tag = document.createElement(o.label);
  for (var i in o.attr) {
    tag.setAttribute(i, o.attr[i]);
  }
  tag.innerHTML = o.text;
  o.childrens.forEach(function(e) {
    var c = createHTML(e);
    tag.appendChild(c);
  });
  return tag;
}

function make(data) {
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
        text: 'Calificación ' + (Math.floor(Math.random() * 6.0) + 4.0),
        childrens: []
      }]
    }, {
      label: 'small',
      attr: {
        class: 'videoId d-none'
      },
      text: videoId,
      childrens: []
    }]
  };
  return createHTML(o);
}
