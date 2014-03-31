
var AjaxConfiguration = {
  root: '',
  loadDataMore: function() {},
  ajax_get: {},
  preRenderCallback: function() {},  
};

function addData(entries) {
  //detect ID offset, and last_end
  var offset = 0;
  var last_end = 0;

  childs = document.getElementById('entries').childNodes;
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
    AjaxConfiguration.loadDataMore = function() {
      AjaxConfiguration.loadDataMore = function () {}
      setLoading('pagination');
      
      $.getJSON(AjaxConfiguration.ajax_url + AjaxConfiguration.root, $.extend({}, AjaxConfiguration.ajax_get, {'page': pagination.page_number + 1})).done(function(data) {
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
    AjaxConfiguration.loadDataMore = function() {}
  }
}

function change(target)
{
  History.pushState({root: target}, '', '' + target);
}

function loadData()
{
  setLoading('data');
  setupPagination(null);

  $.getJSON(AjaxConfiguration.ajax_url + AjaxConfiguration.root

  ,AjaxConfiguration.ajax_get).done(function(data) {
      $('#data').html('<div id="entries" />');

      AjaxConfiguration.preRenderCallback(data);

      var entries = data.entries;
      var pagination = data.pagination;

      addData(entries);
      setupPagination(pagination);

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
    AjaxConfiguration.loadDataMore();
  }
}

