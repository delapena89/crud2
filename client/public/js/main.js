// add scripts

$(document).on('ready', function() {

});
// create payload to render superhero to page
$('form').on('submit', function(e) {
  e.preventDefault();
  var payload = {
    name: $('#name').val(),
    ability: $('#ability').val(),
    nemesis: $('#nemesis').val()
  };
  $.post('/superheros', payload, function(data){
    listSuperheros();
    $('#name').val("");
    $('#ability').val(""),
    $('#nemesis').val("")
  });
});

// delete request
$(document).on('click', '.delete-button', function() {
  $.ajax({
    method: "DELETE",
    url: '/superhero/' + $(this).attr('id')
  }).done(function(data) {
    $("#all").html("");
    $("#results").html('Success!');
    listSuperheros();
  });
});

// editing a single superhero functionality
$(document).on('click', '.edit-button', function() {
  $.get('/superhero/' + $(this).attr('id'),
    function(data) {
      $('#edit-name').val(data.name);
      $('#edit-ability').val(data.ability);
      $('#edit-nemesis').val(data.nemesis);
      $('.update-button').attr('id', data._id);
    });
    $('#edit-form').show();
    $('#superhero-table').hide();
    $('#new-superhero').hide();
});

// cancel request from edit view
$(document).on('click', '#cancel-edit', function(e) {
  e.preventDefault();
  $('#edit-form').hide();
  $('#superhero-table').show();
  $('#new-superhero').show();
});

// creating a request to update superhero
$(document).on('click', '.update-button',function(e){
  // form inputs
  var $updatedSuperheroName = $('#edit-name').val();
  var $updatedSuperheroAbility = $('#edit-ability').val();
  var $updatedSuperheroNemesis = $('#edit-nemesis').val();

  // creating payload
  var payload = {
    name: $updatedSuperheroName,
    ability: $updatedSuperheroAbility,
    nemesis: $updatedSuperheroNemesis
  };
  $.ajax({
    method: "PUT",
    url: '/superhero/' + $(this).attr('id'),
    data: payload
  }).done(function(data) {
    $("#all").html("");
    listSuperheros();
    $('#edit-form').hide();
    $('#superhero-table').show();
    $('#new-superhero').show();
  });
});


// function to render the new Superhero to the page
function listSuperheros() {
  $('#all').html('');
  $.get('/superheros',function(data) {
    for (var i = 0; i < data.length; i++) {
      $('#all').prepend(
        '<tr>' +
        '<td><a href="#">' + data[i].name + '</a></td>' +
        '<td>' + data[i].ability + '</td>' + '<td>' + data[i].nemesis + '</td>' +
        '<td><a class="btn btn-danger btn-xs delete-button" id="' + data[i]._id + '" role="button">Delete</a>' +
        '&nbsp;<a class="btn btn-primary btn-xs edit-button" id="' + data[i]._id + '" role="button">Edit</a></td>' +
        '</tr>'
        );
    }
  });
}
