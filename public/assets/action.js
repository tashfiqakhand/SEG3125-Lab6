$(document).ready(function(){

  $('form').on('submit', function(){

      // var item = $('form input');
      // console.log(item.serializeArray());
      //var r = {items: items.val()};

      $.ajax({
        type: 'POST',
        url: '/survey',
        data: $(this).serializeArray(),
        success: function(data){

          // Make the submit button red, disabled and saying Thank you
          $("#bb").css("background-color", "red");
          $("#bb").prop("disabled", "true");
          $("#bb").text("Thank you!");
        }
      });
      return false;
  });
});
