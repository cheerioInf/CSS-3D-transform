var carousel = document.querySelector('.carousel')
var cells = carousel.querySelectorAll('.carousel__cell')

var cellCount
var selectedIndex = 0
var cellWidth = carousel.offsetWidth
var cellHeight = carousel.offsetHeight
// 是否水平
var isHorizontal = true
var rotateFn = isHorizontal ? 'rotateY' : 'rotateX'
// z距离 ｜ 角度
var radius, theta

// 移动外部盒子
function rotateCarousel () {
  var angle = theta * selectedIndex * -1
  carousel.style.transform = 'translateZ(' + -radius + 'px) ' +
    rotateFn + '(' + angle + 'deg)'
}

// 上一个
var prevButton = document.querySelector('.previous-button')
prevButton.addEventListener('click', function () {
  // 选择序号减1
  selectedIndex--
  rotateCarousel()
})

// 下一个
var nextButton = document.querySelector('.next-button')
nextButton.addEventListener('click', function () {
  // 选择序号加1
  selectedIndex++
  rotateCarousel()
})

// 单元数量
var cellsRange = document.querySelector('.cells-range')
cellsRange.addEventListener('change', changeCarousel)
cellsRange.addEventListener('input', changeCarousel)

function changeCarousel () {
  cellCount = cellsRange.value
  // 计算每次旋转的角度
  theta = 360 / cellCount
  var cellSize = isHorizontal ? cellWidth : cellHeight
  // 计算z的值
  radius = Math.round((cellSize / 2) / Math.tan(Math.PI / cellCount))
  // 如果小于/大于设置的单元数量，则增加/减少并且设定属性
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i]
    if (i < cellCount) {
      cell.style.opacity = 1
      var cellAngle = theta * i
      cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)'
    } else {
      cell.style.opacity = 0
      cell.style.transform = 'none'
    }
  }
  rotateCarousel()
}

// 1
// 给orientation按钮绑定change事件
var orientationRadios = document.querySelectorAll('input[name="orientation"]');
(function () {
  for (var i = 0; i < orientationRadios.length; i++) {
    var radio = orientationRadios[i]
    radio.addEventListener('change', onOrientationChange)
  }
})()

// 确定是水平还是垂直
function onOrientationChange () {
  var checkedRadio = document.querySelector('input[name="orientation"]:checked')
  isHorizontal = checkedRadio.value == 'horizontal'
  rotateFn = isHorizontal ? 'rotateY' : 'rotateX'
  changeCarousel()
}

// 2
// 初始化
onOrientationChange()