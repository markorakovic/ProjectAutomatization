document.addEventListener('DOMContentLoaded', () => {
    fetch('file_names.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('inputFileName').textContent = data.file_2;
            document.getElementById('outputFileName').textContent = data.file_1;
        })
        .catch(error => console.error('Error fetching the JSON file:', error));
});


document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.draggable');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let activeBlock = null;
    let initialX = 0;
    let initialY = 0;
    let xOffset = 0;
    let yOffset = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    blocks.forEach(block => {
        block.addEventListener('mousedown', startDrag);
        block.addEventListener('mouseup', endDrag);
    });

    function startDrag(event) {
        activeBlock = event.target;
        initialX = event.clientX - activeBlock.getBoundingClientRect().left;
        initialY = event.clientY - activeBlock.getBoundingClientRect().top;
        activeBlock.style.zIndex = '100'; // Bring the active block to the front

        canvas.addEventListener('mousemove', drawLines);
    }

    function endDrag() {
        activeBlock = null;
        activeBlock.style.zIndex = '1'; // Reset the z-index

        canvas.removeEventListener('mousemove', drawLines);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas after dragging
    }

    function drawLines(event) {
        if (activeBlock) {
            event.preventDefault();

            const x = activeBlock.offsetLeft + activeBlock.offsetWidth / 2;
            const y = activeBlock.offsetTop + activeBlock.offsetHeight / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before redrawing
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(event.clientX, event.clientY);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
});


