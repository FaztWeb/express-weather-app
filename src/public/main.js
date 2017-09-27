$(function() {
  var $h1 = $("h1");
  var $latitude = $("input[name='latitude']");
  var $longitude= $("input[name='longitude']");
  var btnLocation = $("input[name='btnLocation']");

  btnLocation.on('click',obtener);

  function obtener() {
    geoconfig = {
      enableHighAccuracy:true,
      timeout:10000,
      maximunAge:60000
    };
    navigator.geolocation.getCurrentPosition(
      mostrar, errores, geoconfig
    );
  }

  function mostrar(position) {
    $latitude.val(position.coords.latitude );
    $longitude.val(position.coords.longitude);
  }

  function errores(error) {// este objeto tine dos atributos: error y message
    alert('Error: '+error.code + ' '+error.message);
  }

  $('form').on('submit',function(event){
    event.preventDefault();
    var latitude = $.trim($latitude.val());
    var longitude = $.trim($longitude.val());

    $('h1').text('Loading...');

    var req =$.ajax({
      url:"/latitude/"+latitude+"/longitude/"+longitude,
      dataType:'json'
    });

    req.done(function(data){
      var temperature= data.temperature;
      $h1.html("the temperature in "+ data.timezone+" is "+temperature+ "&#176 Fahrenheit; in latitude:"+latitude+" and longitude: "+longitude);
    });

    req.fail(function(){
      $h1.text('Error!');
    });

  });
});
