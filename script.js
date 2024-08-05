let fields = [
    'circle',
    'circle',
    'circle',
    null,
    null,
    null,
    'cross',
    'cross',
    null,
];


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
            if (fieldValue === 'circle') {
                tableHTML += `<td>${generateCircleSVG()}</td>`;
            } else if (fieldValue === 'cross') {
                tableHTML += `<td>${generateCrossSVG()}</td>`;
            } else {
                tableHTML += '<td></td>';
            }
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    container.innerHTML = tableHTML;
}


function generateCircleSVG() {
    const color = '#00B0EF';
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
    const color = '#FFC000';
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