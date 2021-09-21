import '../sass/main.scss';
import cardTemplate from '../templates/menu-card.hbs'
import menuItems from '../menu.json';
const menuList = document.querySelector('.js-menu');
const themeCheckBox = document.querySelector('#theme-switch-toggle');

const Theme = 
{
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};
const STORAGE_THEME_KEY = 'theme';

/**
 * Метод рендерит список меню на основе списка элементов меню
 * и шаблона карточки меню
 */
const makeMenuList = function (menuList, menuItems, cardTemplate) 
{
    menuList.insertAdjacentHTML('beforeend', cardTemplate(menuItems));
}

/**
 * Метод загрузки и применения темы из LocalStorage
 */
const updateTheme = function ()
{
    const loadedTheme = localStorage.getItem(STORAGE_THEME_KEY);
    if(loadedTheme)
    {
        const obj = JSON.parse(loadedTheme);
        document.body.classList.add(obj.theme);
        themeCheckBox.checked = obj.checked;
    }
    else
    {
        //Default theme
        document.body.classList.add(Theme.LIGHT);
    }
}

/**
 * Слушатель CheckBox
 */
themeCheckBox.addEventListener('change', (event) =>
{
    document.body.classList.replace(event.target.checked ? Theme.LIGHT : Theme.DARK, 
                                    event.target.checked ? Theme.DARK : Theme.LIGHT);
    //Сохраняю выбранную тему
    localStorage.setItem(STORAGE_THEME_KEY, JSON.stringify(
        {theme: document.body.classList[0], checked: event.target.checked}));
});


//Меню
makeMenuList(menuList, menuItems, cardTemplate);
//Утанавливаю тему
updateTheme();

