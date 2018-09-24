function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    //var str = JSON.stringify(response.result.items);
    var searchContainer = $('#search-container');
    searchContainer.html('');
    var listItems = response.result.items;
    listItems.forEach(function(e) {
      var videoId = JSON.stringify(e.id.videoId);
      var title = JSON.stringify(e.snippet.title);
      var channelTitle = JSON.stringify(e.snippet.channelTitle);
      videoId = videoId.substr(1, videoId.length - 2);
      title = title.substr(1, title.length - 2);
      channelTitle = channelTitle.substr(1, channelTitle.length - 2);

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
            label: 'button',
            attr: {
              class: 'btn btn-primary btn-sm'
            },
            text: 'Enviar',
            videoId: videoId,
            title: title,
            channelTitle: channelTitle,
            childrens: []
          }]
        }]
      };
      var h = createHTML(o);
      searchContainer.append(h);
    });
  });
}
