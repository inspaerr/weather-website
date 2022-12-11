button.onclick = function () {
 var response = prompt("Желаете пройти регистрацию на сайте?", "");
 var message;

 if(response == "Да") {
     message = "Круто!"
 }else{
     message = "Попробуй ещё раз"
 }
     alert(message);
}
button2.onclick = function () {
let userName = prompt("Кто там?", '');

if (userName === 'Админ') {

  let pass = prompt('Пароль?', '');

  if (pass === 'Я главный') {
    alert( 'Здравствуйте!' );
  } else if (pass === '' || pass === null) {
    alert( 'Отменено' );
  } else {
    alert( 'Неверный пароль' );
  }

} else if (userName === '' || userName === null) {
  alert( 'Отменено' );
} else {
  alert( "Я вас не знаю" );
}
}

document.querySelectorAll('.like').forEach(button => {
  button.addEventListener('click', e => {
    button.classList.toggle('liked');
    if (button.classList.contains('liked')) {
      gsap.fromTo(button, {
        '--hand-rotate': 8
      }, {
        ease: 'none',
        keyframes: [{
          '--hand-rotate': -45,
          duration: .16,
          ease: 'none'
        }, {
          '--hand-rotate': 15,
          duration: .12,
          ease: 'none'
        }, {
          '--hand-rotate': 0,
          duration: .2,
          ease: 'none',
          clearProps: true
        }]
      });
    }
  })
});

