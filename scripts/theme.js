const themeSwitch = document.querySelector('.switch input');
const currTheme = localStorage.getItem('theme');
if(currTheme) {
    document.documentElement.setAttribute('data-theme', currTheme);
    if(currTheme === 'light') {
        themeSwitch.checked = true;
    }
}
function toggleTheme(e) {
    if(e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

themeSwitch.addEventListener('change', toggleTheme, false);