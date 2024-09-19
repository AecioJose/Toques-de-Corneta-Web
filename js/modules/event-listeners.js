import { addTonesBtn, editBtnNchangeOrder, changeOrderImg } from './dom-elements.js';
import { renderTones } from './rendering-cards.js';

// Botoes de editar/mudar posição e adicionar toques
export let isAddingTones = false;
export let isChangingOrder = false;
export function setupEditButton() { 

    addTonesBtn.addEventListener('click', () => {
        isAddingTones = !isAddingTones;
        if (isAddingTones) {
            isChangingOrder = false;
            editBtnNchangeOrder.style.display = 'none';
            addTonesBtn.classList.add('active');
            addTonesBtn.innerHTML = '<img style="width: 65%; height: auto;" src="/assets/images/icons/white-check.png">';
        } else {
            isChangingOrder = true;
            addTonesBtn.classList.remove('active');
            addTonesBtn.innerHTML = 'Adicionar Toques <span style="font-size: 3vw; margin-left: 0.5vw;">+</span>';
            editBtnNchangeOrder.style.display = 'inline-block';
        }
        renderTones();
    });

    editBtnNchangeOrder.addEventListener('click', () => {
        isChangingOrder = !isChangingOrder;
        if (isChangingOrder) {
            isAddingTones = false;
            addTonesBtn.style.display = 'none';
            editBtnNchangeOrder.classList.add('active');
            changeOrderImg.src = "/assets/images/icons/white-check.png";
            addTonesBtn.style.display = 'flex';
        } else {
            editBtnNchangeOrder.classList.remove('active');
            changeOrderImg.src = "/assets/images/icons/pencil.png";
            addTonesBtn.style.display = 'none';
        }
        renderTones();
    });
}

