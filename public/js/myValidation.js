$(document).ready(function () {

var firstName = $('#newContactForm').find('input[name="firstName"]');
var lastName = $('#newContactForm').find('input[name="lastName"]');
var number = $('#newContactForm').find('input[name="telephoneNumber"]');
var saveBtn = $('#addNew').find('.modalSave');
var formArr = [firstName, lastName, number];
var infoSpan = $('#newContactForm').find('.validationInfo');
var m =0;


firstName.on('focusout',{min:3, max:20, re:/[^a-zA-Z]/ }, inputValidate);
lastName.on('focusout', {min:3, max:20,re:/[^a-zA-Z]/   } ,inputValidate );
number.on('focusout',{min:8, max:20,re:/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/ }, inputValidate );
saveBtn.on('click',saveBtnValidation)

function saveBtnValidation() {
  m=0;
  $.each(formArr, function (i, value) {
    value.trigger('focusout');
  })
  if (m==3) {
    // saveBtn.removeAttr('disabled');
    saveBtn.addClass('ok');
    m==0;
  }
}

function inputValidate(event) {
var inputLength = $(this).val().length;
var regEx = new RegExp(event.data.re);


if (inputLength == 0) {
  $(this).prev().text('Please, fill this field.');
  // saveBtn.attr('disabled', 'disabled');


} else if ( (inputLength < event.data.min && inputLength != 0) || inputLength > event.data.max ) {
  $(this).prev().text('Text must have more then '+(event.data.min)+' and less than '+event.data.max+' caracters.');
  // saveBtn.attr('disabled', 'disabled');

}else if( regEx.test( $(this).val() ) ){
$(this).prev().text('Some caraters is not valid');
// saveBtn.attr('disabled', 'disabled');

}else {
    $(this).prev().text('');
    m++;
    console.log(m);

}
}; // inputValidate End



});
