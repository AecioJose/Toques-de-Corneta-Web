import { saveToLocalStorage, toneOrder } from './rendering-cards.js';
import { renderTones } from './rendering-cards.js';

let draggedToneId = null;

export function dragStart(e) {
    draggedToneId = Number(e.currentTarget.dataset.id);
    e.currentTarget.classList.add('dragging');
}

export function dragOver(e) {
    e.preventDefault();
    const target = e.currentTarget;
    const targetToneId = Number(target.dataset.id);

    if (draggedToneId === targetToneId) return;

    const draggedIndex = toneOrder.indexOf(draggedToneId);
    const targetIndex = toneOrder.indexOf(targetToneId);

    toneOrder.splice(draggedIndex, 1);
    toneOrder.splice(targetIndex, 0, draggedToneId);

    renderTones();
}

export function drop(e) {
    e.currentTarget.classList.remove('dragging');
    saveToLocalStorage();
}

export function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    saveToLocalStorage();
}
