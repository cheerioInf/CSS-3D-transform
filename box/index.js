var box = document.querySelector('.box')
var radioGroup = document.querySelector('.radio-group')
var currentClass = ''

function changeSide () {
  var checkedRadio = radioGroup.querySelector(':checked')
  var showClass = 'show-' + checkedRadio.value
  if (currentClass) {
    box.classList.remove(currentClass)
  }
  box.classList.add(showClass)
  currentClass = showClass
}
// set initial side
changeSide()

radioGroup.addEventListener('change', changeSide)