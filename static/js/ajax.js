
var loadDataMore = function() {}
var root = '';
var ajax_get = {};

function addData(entries) {
  //detect ID offset, and last_end
  var offset = 0;
  var last_end = 0;

  childs = document.getElementById('data').childNodes;
  for (var i = 0; i < childs.length; i++) {
    var e = childs[i];
    if (e.id == '') offset += 1;
    else {
      last_end = parseInt(e.id.substring(4, e.id.length));
    }
  }

  for (var i = 0; i < entries.length; i++) {
    if (entries[i].level == 3) last_end = i;

    render(offset + i, entries[i], last_end);
  }
}

function setupPagination(pagination) {
  if (pagination && pagination.has_next) {
    loadDataMore = function() {
      loadDataMore = function () {}
      setLoading('pagination');
      
      $.getJSON(ajax_url + root, $.extend({}, ajax_get, {'page': pagination.page_number + 1})).done(function(data) {
        var entries = data.entries;
        var pagination = data.pagination;

        addData(entries);
        setupPagination(data.pagination);

        $('#pagination').html('');
      })
      .fail(function() {
        setError('pagination');
      });

    }
  } else {
    loadDataMore = function() {}
  }
}

function loadData(doneCallback)
{
  setLoading('data');
  setupPagination(null);

  $.getJSON(ajax_url + root

  ,ajax_get).done(function(data) {
      $('#data').html('');

      var entries = data.entries;
      var pagination = data.pagination;

      addData(entries);
      setupPagination(pagination);
      if (doneCallback) {
        doneCallback(data.extra);
      }
    })
    .fail(function() {
      setError('data');
    });
}

function isScrolledIntoView(elem)
{
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
    && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
}

function scrollFunction() {
  if (isScrolledIntoView('#pagination')) {
    loadDataMore();
  }
}

