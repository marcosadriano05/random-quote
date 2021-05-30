const text = document.getElementById('text')
const author = document.getElementById('author')
const buttonNewQuote = document.getElementById('new-quote')
const buttonTweetQuote = document.getElementById('tweet-quote')
const main = document.querySelector('[data-tag="main"]')

const backgroundColors = [
  '#EF7C8E',
  '#67595E',
  '#189AB4',
  '#05445E',
  '#0000FF',
  '#000C66',
  '#050A30',
  '#F51720',
  '#FA26A0',
  '#B68D40',
  '#122620',
  '#59981A',
  '#81B622',
  '#3D550C'
]

function fetchQuote() {
  fetch('https://api.quotable.io/random')
  .then(res => {
    if (res.status !== 200) throw new Error('Request is not successful')
    return res.json()
  })
  .then(data => populateQuoteBox(data))
  .catch(error => console.log(error.message))
}

function populateQuoteBox(data) {
  text.innerHTML = `<i class="fas fa-quote-left"></i> ${data.content}`
  author.innerHTML = data.author
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  })

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

function randomColor(colorsArray) {
  let randomNumber = Math.floor(Math.random() * colorsArray.length)
  let currentColor = main.style.backgroundColor

  while (hexToRgb(colorsArray[randomNumber]) === currentColor) {
    randomNumber = Math.floor(Math.random() * colorsArray.length)
  }

  return colorsArray[randomNumber]
}

function putColorsInDOM(colorsArray) {
  const color = randomColor(colorsArray)
  main.style.backgroundColor = color
  text.style.color = color
  author.style.color = color
  buttonNewQuote.style.backgroundColor = color
  buttonTweetQuote.style.backgroundColor = color
}

function init() {
  buttonNewQuote.addEventListener('click', () => {
    fetchQuote()
    putColorsInDOM(backgroundColors)
  })
  
  fetchQuote()
}

init()
