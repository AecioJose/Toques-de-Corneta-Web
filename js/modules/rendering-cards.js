import { buttonContainer } from './dom-elements.js';
import { dragStart, dragOver, drop, dragEnd } from './drag-and-drop.js';
import { tones } from './cards-data.js';
import { playTone } from './audio-actions.js'
import { isAddingTones, isChangingOrder } from './event-listeners.js';


// Função para salvar seleção e ordem no localStorage
export let selectedTones = JSON.parse(localStorage.getItem('selectedTones')) || [];
export let toneOrder = JSON.parse(localStorage.getItem('toneOrder')) || selectedTones.slice();
export function saveToLocalStorage() {
    localStorage.setItem('selectedTones', JSON.stringify(selectedTones));
    localStorage.setItem('toneOrder', JSON.stringify(toneOrder));
}


// Função para alternar a seleção de um toque
function toggleToneSelection(toneId) {
    if (selectedTones.includes(toneId)) {
        selectedTones = selectedTones.filter(id => id !== toneId);
        toneOrder = toneOrder.filter(id => id !== toneId);
    } else {
        selectedTones.push(toneId);
        toneOrder.splice(selectedTones.length - 1, 0, toneId); // Move para o final dos selecionados
    }

    renderTones();
    saveToLocalStorage();
}


// Função para renderizar os botões de toques
export function renderTones() {
    buttonContainer.innerHTML = '';

    // Determinar quais toques serão exibidos
    let tonesToDisplay = [];

    if (isAddingTones) {
        // Exibe todos os toques, com os não selecionados no final
        tonesToDisplay = tones.filter(tone => !selectedTones.includes(tone.id));
        tonesToDisplay = [...selectedTones.map(id => tones.find(t => t.id === id)), ...tonesToDisplay];
    } else {
        // Exibe apenas os toques na ordem definida
        tonesToDisplay = toneOrder.map(id => tones.find(tone => tone.id === id));
    }

    tonesToDisplay.forEach(tone => {
        const button = document.createElement('div');
        button.classList.add('tone-button');
        button.dataset.id = tone.id;

        // Adicionar classe 'selected' se o toque estiver selecionado
        if (selectedTones.includes(tone.id)) {
            button.classList.add('selected');
        }

        button.innerHTML = `
            <div class="editMoveCard" > 
                <div class="editMoveCard-pencil" alt="lapis para editar card"></div>
                <div class="editMoveCard-MoveIcon" alt="icone indicando que pode mover o card de lugar"></div> 
            </div>
            <div id="img${tone.id}" class="img-container"></div>
            <h3>${tone.name}</h3>
        `;
        const img = button.querySelector(`#img${tone.id}`)
        img.style.backgroundImage = `url('${tone.image}')`;
        img.style.backgroundRepeat = "no-repeat";
        img.style.backgroundSize = "contain";
        img.style.backgroundPosition = "50% 50%"

        
        

        // Eventos de clique
        if (isAddingTones) {
            button.addEventListener('click', () => toggleToneSelection(tone.id));
        } else {
            button.addEventListener('click', () => playTone(tone.audio));
        }

        // Eventos de drag and drop
        if (isChangingOrder) {
            button.setAttribute('draggable', true);
            button.addEventListener('dragstart', dragStart);
            button.addEventListener('dragover', dragOver);
            button.addEventListener('drop', drop);
            button.addEventListener('dragend', dragEnd);

            button.addEventListener('touchstart', dragStart);
            button.addEventListener('touchmove', dragOver);  // Permiti que o item siga o dedo durante o toque
            button.addEventListener('touchend', dragEnd);
            
            //Ativando icones de mover e editar card quando o editButton for ativado
            button.querySelector('.editMoveCard').style.display = 'flex';

        } else {
            //Desativando icones de mover e editar card
            button.querySelector('.editMoveCard').style.display = 'none';
        }

        buttonContainer.appendChild(button);
    });
}