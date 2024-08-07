let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];


let currentPlayer = 'circle'; // Aktueller Spieler
let colorCircle = '#00B0EF';
let colorCross = '#FFC000';

const duration = '300ms';

function init() {
    render();
}


function render() {
    const container = document.getElementById('container');

    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const fieldIndex = i * 3 + j;
            const fieldValue = fields[fieldIndex];
            tableHTML += `<td onclick="handleClick(${fieldIndex}, this)">`;
            if (fieldValue === 'circle') {
                tableHTML += generateCircleSVG();
            } else if (fieldValue === 'cross') {
                tableHTML += generateCrossSVG();
            }
            tableHTML += '</td>';
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    container.innerHTML = tableHTML;
}


function checkDraw() {
    return fields.every(field => field !== null);
}


function handleClick(index, element) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        element.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        element.onclick = null;

        const winningPattern = checkWin();
        if (winningPattern) {
            setTimeout(drawWinningLine(winningPattern), 5000);
            updateStatus(`${currentPlayer === 'circle' ? 'Circle' : 'Cross'} wins!`, currentPlayer === 'circle' ? colorCircle : colorCross);
            return;
        }
    }

    if (checkDraw()) {
        setTimeout(() => updateStatus("It's a draw!", '#FFFFFF'), duration);
        return;
    }

    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
}



function updateStatus(message, color) {
    const statusDiv = document.getElementById('status');
    statusDiv.innerHTML = message;
    statusDiv.style.color = color;
}


function resetStatus() {
    const statusDiv = document.getElementById('status');
    statusDiv.innerHTML = '';
}



function checkDraw() {
    return fields.every(field => field !== null);
}


function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return pattern;
        }
    }
    return null;
}


function restartGame() {
    fields = [null, null, null, null, null, null, null, null, null];
    currentPlayer = 'circle';
    resetStatus();
    render();
}


function drawWinningLine(pattern) {
    const container = document.getElementById('container');
    const lineHTML = generateWinningLineSVG(pattern);
    const lineContainer = document.createElement('div');
    lineContainer.innerHTML = lineHTML;
    container.appendChild(lineContainer);
}


function generateWinningLineSVG(pattern) {
    const lineColor = currentPlayer === 'circle' ? colorCircle : colorCross;
    const width = 100;
    const height = 100;
    border = 5;
    const lineWidth = 10;

    const coords = {
        0: { x: 0, y: 0 }, 1: { x: 1, y: 0 }, 2: { x: 2, y: 0 },
        3: { x: 0, y: 1 }, 4: { x: 1, y: 1 }, 5: { x: 2, y: 1 },
        6: { x: 0, y: 2 }, 7: { x: 1, y: 2 }, 8: { x: 2, y: 2 }
    };

    const start = coords[pattern[0]];
    const end = coords[pattern[2]];

    const startX = start.x * (width + border) + width / 2;
    const startY = start.y * (height + border) + height / 2;
    const endX = end.x * (width + border) + width / 2;
    const endY = end.y * (height + border) + height / 2;

    const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

    return `
        <svg width="${3 * (height + border)}" height="${3 * (height + border)}" style="position:absolute; top:5px; left:5px;">
            <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="${lineColor}" stroke-width="${lineWidth}" stroke-linecap="round"
                stroke-dasharray="${length}" stroke-dashoffset="${length}">
                <animate attributeName="stroke-dashoffset" from="${length}" to="0" dur="${duration}" fill="freeze" />
            </line>
        </svg>
    `;
}


function generateCircleSVG() {
    const color = colorCircle;
    const width = 70;
    const height = 70;

    const svgHTML = `
        <svg width="${width}px" height="${height}px" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="${color}" stroke-width="10" fill="none">
                <animate 
                    attributeName="stroke-dasharray" 
                    from="0, 283" 
                    to="283, 283" 
                    dur="${duration}" 
                    fill="freeze" 
                />
            </circle>
        </svg>
    `;
    return svgHTML;
}


function generateCrossSVG() {
    const color = colorCross;
    const width = 70;
    const height = 70;

    const svgHTML = `
        <svg width="${width}" height="${height}" viewBox="0 0 100 100">
            <line x1="20" y1="20" x2="80" y2="80" stroke="${color}" stroke-width="10" stroke-linecap="round">
                <animate 
                    attributeName="stroke-dasharray" 
                    from="0, 85" 
                    to="85, 85" 
                    dur="${duration}" 
                    fill="freeze" 
                />
            </line>
            <line x1="80" y1="20" x2="20" y2="80" stroke="${color}" stroke-width="10" stroke-linecap="round">
                <animate 
                    attributeName="stroke-dasharray" 
                    from="0, 85" 
                    to="85, 85" 
                    dur="${duration}" 
                    fill="freeze" 
                />
            </line>
        </svg>
    `;
    return svgHTML;
}