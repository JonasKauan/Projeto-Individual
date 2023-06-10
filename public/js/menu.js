// mudar cor quando clicar 
var menu_item = document.querySelectorAll('.item_menu');
var link_menu = document.querySelectorAll('.link');
var container = document.querySelector('.conteudo');

function selecionar(){
    menu_item.forEach((item) => item.classList.remove('ativo'));

    this.classList.add('ativo');
}

function selecionar_link(){
    link_menu.forEach((item) => item.removeAttribute('id'));
    this.setAttribute('id', 'link_ativo');
}

menu_item.forEach((item) => item.addEventListener('click', selecionar));
link_menu.forEach((item) => item.addEventListener('click', selecionar_link))

// expandir menu

var bt_expandir = icone_expandir;
var nav = document.querySelector('.menu_lateral');
var menu_ativo = false;

bt_expandir.addEventListener('click', function(){
    menu_ativo = !menu_ativo;
    nav.classList.toggle('expandir');
    container.classList.toggle('container_menu_expandido');
});