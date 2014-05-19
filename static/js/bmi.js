
function calculate_bmi() {
  //load data
  var cm = parseInt(document.getElementById('bmi_cm').value);
  var kg = parseInt(document.getElementById('bmi_kg').value);

  var cm_group = $('#id_bmi_cm_group');
  var kg_group = $('#id_bmi_kg_group');

  var cm_error = false;
  var kg_error = false;

  if (isNaN(cm) || cm < 30 || cm > 300) {
    cm_error = true;
    cm_group.addClass('has-error');
  }
  if (!cm_error || document.getElementById('bmi_cm').value == '') {
    cm_group.removeClass('has-error');
  }

  if (isNaN(kg) || kg < 30 || kg > 300) {
    kg_error = true;
    kg_group.addClass('has-error');
  }
  if (!kg_error || document.getElementById('bmi_kg').value == '') {
    kg_group.removeClass('has-error');
  }

  var text = new Array();
  var vls = new Array();

  vls[0]  = 18.5;
  text[0] = "Podváha (< " + vls[0] + ")";
  vls[1]  = 24.9;
  text[1] = "Ideální&nbsp;váha (" + (vls[0] + 0.1) + "&nbsp;-&nbsp;" + vls[1] + ")";
  vls[2]  = 29.9;
  text[2] = "Nádvaha (" + (vls[1] + 0.1) + "&nbsp;-&nbsp;" + vls[2] + ")";
  text[3] = "Obezita (> " + (vls[2] + 0.1) + ")";

  if (!cm_error && !kg_error) {
      var m = cm/100.0;
      var h2 = m*m;

      var bmi = kg/h2;

      //round to single decimal
      bmi *= 10;
      bmi = Math.round(bmi);
      bmi /= 10.0;

      var bmi_text = text[3];

      for (var i = 0; i < 4; i++) {
        if (bmi <= vls[i]) {
          bmi_text = text[i];
          break;
        }
      }

      $('#bmi_text').html('<b>' + bmi + '</b><br/>' + bmi_text);
      $('#bmi_number').html(bmi);

      $('#bmi_header_computed').removeClass("hidden");
      $('#bmi_header_unknown').addClass("hidden");

  } else {
    $('#bmi_text').html('Zadej hodnoty výše, pro výpočet BMI');
    $('#bmi_number').html();

    $('#bmi_header_computed').addClass("hidden");
    $('#bmi_header_unknown').removeClass("hidden");
  }
}

calculate_bmi();

$('#bmi_accordion .panel-collapse').on('show.bs.collapse', function () {
  $('#bmi_header_full').removeClass("hidden");
  $('#bmi_header_collapsed').addClass("hidden");

});

$('#bmi_accordion .panel-collapse').on('hidden.bs.collapse', function () {
  $('#bmi_header_full').addClass("hidden");
  $('#bmi_header_collapsed').removeClass("hidden");
});
