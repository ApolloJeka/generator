// шаблони тексту
var intro = ['$a_intro$'];
var text = ['$a_text$'];
var outro = ['$a_outro$'];

var text_obj = {

  structure: [
    ''
  ],
  // текст для начала
    a_intro: ['рейка монтажна деревяна', 'деревяна рейка монтажна', 'монтажна рейка деревяна'],
    a_text: ['40x50', '20x80', '40x40'],
    something: ['3000', '4000', '6000'],
    a_outro: ['свіжа з колоди', 'свежепіл', 'свіжа і рівна'],
};
// прибираємо знаки долара
function parse_keywords(string) {

  pattern = /\$\w+\$/g;

  keyword = string.match(pattern);

  if (keyword) {

    for (var i = keyword.length - 1; i >= 0; i--) {
 
      keyword[i] = keyword[i].replace(/\$/g, '');
    }
  }

  return keyword;
}

function randz(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// вибір випадкового елементу масива
function randomize(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
// зміна слів
function replace_keyword(source, keyword, variant) {
  return (source.replace('$' + keyword + '$', variant));
}
//підставляємо слова
function bake(object) {

  var result = randomize(object['structure']);

  do {
  
    keywords = parse_keywords(result);

    if (keywords) {
      
      for (var i = keywords.length - 1; i >= 0; i--) {
        
        if (object.hasOwnProperty(keywords[i])) {
          result = replace_keyword(result, keywords[i], randomize(object[keywords[i]]));
        }
      }
    }
  } while (keywords);

  return result;
}
// виводимо текст
function generate_structure() {

  var mood = randz(0, 1);

  result = '<h2>' + intro + '</h1>\n';
  result += '<p>' + text + '</p>\n';
  result += '<p>' + outro + '</p>\n';

  return result;
}
// зєднуємо текст з тегами
function send(text) {
  document.getElementById('text_here').innerHTML = text;
}
// по клікуформує новий текст
function get_text() {

  var currentObject = text_obj;

  currentObject.structure[0] = generate_structure();

  result = bake(currentObject);

  send(result);
}  