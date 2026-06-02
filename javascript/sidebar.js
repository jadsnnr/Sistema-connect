const toggleBtn = document.getElementById('toggleSidebar');

const sidebar = document.getElementById('sidebar');

const main = document.getElementById('main');


toggleBtn.addEventListener('click', () => {

  sidebar.classList.toggle('closed');

  main.classList.toggle('full');

});