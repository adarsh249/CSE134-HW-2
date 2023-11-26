const themeSwitch = document.querySelector('.switch input');
const currTheme = localStorage.getItem('theme');
if(currTheme) {
    document.documentElement.setAttribute('data-theme', currTheme);
    if(currTheme === 'dark') {
        themeSwitch.checked = true;
    }
}
function toggleTheme(e) {
    if(e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

themeSwitch.addEventListener('change', toggleTheme, false);