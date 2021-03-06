var itemTemplate = $('#templates .item');
var list		=$('#list');

var addItemToPage = function(itemData) {
  var item = itemTemplate.clone();
  
  item.attr('data-id',itemData.id);
  item.find('.description').text(itemData.description);
  
  if(itemData.completed) {
    item.addClass('completed');
  }

  list.append(item);
}

var loadRequest = $.ajax({
  type: 'GET',
  url: "https://listalous.herokuapp.com/lists/yauri/"
});

loadRequest.done(function(dataFromServer) {
  var itemsData = dataFromServer.items

  itemsData.forEach(function(itemData) {
    addItemToPage(itemData);
  })
})

$('#add-form').on('submit', function(event) {
	event.preventDefault()
  var itemDescription = event.target.itemDescription.value;
  var creationRequest = $.ajax({
    type: 'POST',
    url: "http://listalous.herokuapp.com/lists/yauri/items",
    data: { description: itemDescription, completed: false }
  });

  creationRequest.done(function(itemDataFromServer) {
    $("#create").val('');

  	addItemToPage(itemDataFromServer);
  })
 
});


