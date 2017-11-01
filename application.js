$(document).ready(function () {
   $('form').submit(function(e){
    e.preventDefault();
    var form = $(this);

    function validation(){
      var reg_zip = /^\d+$/;
      var zip = $("input[name='zip']").val();
      if (!zip.match(reg_zip)) {
        return false
      };


      var reg_state = /\b([A-Z]{2})\b/
      var state = $("input[name='state']").val()
      if (!state.match(reg_state)) {
        return false
      }

      return true
    };

    if (validation()) {
      $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: form.serialize()
      });
    } else {
      alert("Formatted Incorrectly");
    }

  });

});