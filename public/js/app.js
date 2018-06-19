$(document).ready(function(){

var allContacts = $('#allContacts');
var delContacts= $('#deleteContact');
var tbodyAll =allContacts.find('#my');
var saveBtn = $('#addNew').find('.modalSave');
var newContactForm = $('#newContactForm');
var search = $('#search');
var allData;


saveBtn.on('click', function () {
  setTimeout(function () {
    if (saveBtn.hasClass('ok')) {
      saveData();
    }
  },100)

});

$('nav').on('click', '.deleteBtn',function () {
  delContacts.toggle();
  allContacts.toggle();
  readAll();
});

search.on('keyup',searchContacts);

allContacts.show();
 readAll();


//search contacts function
function searchContacts() {
  var searchText = $(this).val().toLowerCase();
  if (searchText.length>3) {
    // filter
    var searchData = $.grep(allData,function (value, i) {
      return (value.lastName.toLowerCase().includes($.trim(searchText)));
    });
    allContacts.find('h3').text('Search Contacts');
    writeData(searchData);
  }else{
    readAll();
    allContacts.find('h3').text('All Phone Book Contacts');
  }

}

//delete one phone from db
function deleteOne() {
  var delId = $(this).data('id');

  $.ajax({
    url:'/deleteOne',
    type:'post',
    data:{id:delId}
  }).done(function (res) {
  readAll();
}).fail(function () {
  console.log('Error');
})

}

// save data to db
function saveData() {
var newName = newContactForm.find('.newName').val();
var newLast = newContactForm.find('.newLast').val();
var newNum = newContactForm.find('.newNum').val();

var newPhone = {
  firstName:newName,
  lastName:newLast,
  telephoneNumber: newNum
}

$.ajax({
  url:'/saveOne',
  type:'post',
  data:newPhone
}).done(function (res) {
    $('#newContactForm').find('input').val('');
    readAll();
    saveBtn.removeClass('ok');
    newPhone = '';

}).fail(function () {
  console.log('Error');
})
}; // save data end


// read all phone number from db func
function readAll() {
  $.ajax({
    url:"/readAll",
    type:"get",
    dataType:"json"

  }).done(function (res) {
      writeData(res);
    allData = res;
  })
  .fail(function () {
    console.log("Eror");
  })
} // readAll End

// write data in table
function writeData(data) {
var text = '';

if (allContacts.css('display') == 'block') {
  $.each(data, function (index, value) {
    text +=  `<tr>
        <td>${value.id}</td>
        <td>${value.firstName}</td>
        <td>${value.lastName}</td>
        <td>${value.telephoneNumber}</td>
      </tr>`
  })
  tbodyAll.html(text);

}else {
  $.each(data, function (index, value) {
    text +=  `<tr>
        <td>${value.id}</td>
        <td>${value.firstName}</td>
        <td>${value.lastName}</td>
        <td>${value.telephoneNumber}</td>
        <td ><button class="btn btn-danger delCont hideElement" data-id ="${value.id}">Delete</button></td>
      </tr>`
  })
  $('#delBody').html(text);
  delContacts.on('click', '.delCont', deleteOne);

}
} // writeData end

});
