
function updateCoords(c)
{
  jQuery('#id_x').val(c.x);
  jQuery('#id_y').val(c.y);
  jQuery('#id_w').val(c.w);
  jQuery('#id_h').val(c.h);

  img = $("#id_avatarstaging");
  jQuery('#id_disp_width').val(img.width());
  jQuery('#id_disp_height').val(img.height());

};

function checkCoords()
{
  if (parseInt(jQuery('#id_w').val())>0) return true;
  alert('Please select a crop region then press submit.');
  return false;
};

function handleFileSelect(evt) {
  files = evt.target.files;

  if (files.length == 1) {

    f = files[0];

    // Only process image files.
    if (!f.type.match('image.*')) {
      alert('Not an image');
      return;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // Render thumbnail.

        //remove previous jcrop
        $('div#id_avatardiv').html('<img id="id_avatarstaging" class="hidden avatar-staging" />');        

        img = $('#id_avatarstaging');
        img.attr("src", e.target.result);
        img.removeClass('hidden');
        
        $('#id_avatarsubmit').removeClass('hidden');
        $('#id_avatarsubmitlabel').removeClass('hidden');

        $('#id_img_change_hide').addClass('hidden');

        jQuery(function($) {
          var width = img.width();
          var height = img.height();

          var m = width;

          if (height < width) m = height;

          var size = m/2;

          var x = width/2 - size/2;
          var y = height/2 - size/2;

          img.Jcrop({
            onSelect:    updateCoords,
            bgColor:     'black',
            bgOpacity:   .7,
            setSelect:   [ x, y, x+size, y+size ],
            aspectRatio: 1
          });
        });

      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);

  } 
}

