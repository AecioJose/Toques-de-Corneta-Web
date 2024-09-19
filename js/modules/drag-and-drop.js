import { saveToLocalStorage, toneOrder } from './rendering-cards.js';
import { renderTones } from './rendering-cards.js';

let draggedToneId = null;
let halfWidth = 0;
let halfHeight = 0;
let dragPreview = null;


export function dragStart(e) {
    draggedToneId = Number(e.currentTarget.dataset.id);
    e.currentTarget.classList.add('dragging');

    //----------teste preview card mobile
    if(e.type === 'touchstart'){
        //Largura para centralizar no meio do dedo
        const rect = e.currentTarget.getBoundingClientRect()
        halfHeight = rect.height/2
        halfWidth = rect.width/2

        // Clona o card arrastado para usar de preview para o toque
        dragPreview = e.currentTarget.cloneNode(true);
        dragPreview.style.position = 'absolute';
        dragPreview.style.opacity = '0.7'; 
        dragPreview.style.pointerEvents = 'none'; // Evita interferência do preview nos eventos touch
        dragPreview.style.zIndex = '1001';

        document.body.appendChild(dragPreview);

        const touch = e.touches[0];
        
        dragPreview.style.top = `${touch.clientY - halfHeight}px`;
        dragPreview.style.left = `${touch.clientX -  halfWidth}px`;



    }
    //-----------teste
}


export function dragOver(e) {
    e.preventDefault();
    
    if (e.type === 'touchmove') {
        //----teste preview card mobile moving with touch
        if (dragPreview) {
            const touch = e.touches[0];
            const rect = dragPreview.getBoundingClientRect()
            dragPreview.style.top = `${touch.clientY - halfHeight}px`;
            dragPreview.style.left = `${touch.clientX -  halfWidth}px`;
        }
        //-------teste

        const touch = e.changedTouches[0];
        const dropElement = document.elementFromPoint(touch.clientX, touch.clientY);
        const targetToneId = Number(dropElement.dataset.id);

        if (targetToneId && draggedToneId !== targetToneId) {
            const draggedIndex = toneOrder.indexOf(draggedToneId);
            const dropIndex = toneOrder.indexOf(targetToneId);

            toneOrder.splice(draggedIndex, 1);
            toneOrder.splice(dropIndex, 0, draggedToneId);

        }
        
    } else{
        const targetToneId = Number(e.currentTarget.dataset.id);

        if (draggedToneId === targetToneId) return;

        const draggedIndex = toneOrder.indexOf(draggedToneId);
        const targetIndex = toneOrder.indexOf(targetToneId);

        toneOrder.splice(draggedIndex, 1);
        toneOrder.splice(targetIndex, 0, draggedToneId);
    }
    

    renderTones();
}


export function drop(e) {
    e.currentTarget.classList.remove('dragging');
    saveToLocalStorage();

    if (dragPreview) {
        document.body.removeChild(dragPreview);
        dragPreview = null;
    }
}

export function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    saveToLocalStorage();

    if (dragPreview) {
        document.body.removeChild(dragPreview);
        dragPreview = null;
    }
}
