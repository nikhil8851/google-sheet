// Select DOM elements
let grid = document.querySelector(`#grid`);
let boldIcon = document.querySelector(`.bold`);   // Bold button
let italicIcon = document.querySelector(`.italic`); // Italic button
let colorButton = document.querySelector(`.textcolor`); // Color change button
let colorPicker = document.querySelector(`#colorPicker`); // Hidden color picker
let zoomSelect = document.querySelector(`#Zoom`); // Zoom dropdown
let increaseFontButton = document.querySelector('.increase-font'); // Increase font size button
let decreaseFontButton = document.querySelector('.decrease-font'); // Decrease font size button

// Function to create a new column header
function createColumnHeaders() {
    for (let col = 0; col <= 26; col++) {
        let newcol = document.createElement('div'); 
        if (col != 0) {
            newcol.innerText = String.fromCharCode(64 + col); // Letters A-Z
        }
        newcol.className = "headercol";
        grid.append(newcol);
    }
}

// Function to create rows and cells
function createRows(startRow, rowCount) {
    for (let row = startRow; row < startRow + rowCount; row++) {
        let headerrow = document.createElement('div'); 
        headerrow.className = "headerrow";    
        headerrow.innerText = row; // Display row number (1-100)
        grid.append(headerrow);

        // Create the rest of the columns for each row
        for (let col = 1; col <= 26; col++) {
            let newcol = document.createElement('div'); 
            newcol.className = "divs";
            newcol.contentEditable = true;
            newcol.innerText = ""; // Empty cell
            grid.append(newcol);
            newcol.addEventListener('click', multipleselect);
        }
    }
}




// Function to handle multiple selections
let selectedcell = new Set();
function multipleselect(e) {
    if (!e.ctrlKey && !e.metaKey) {
        for (let t of selectedcell) {
            t.classList.remove('selected');
        }
        selectedcell.clear();
    }
    if (selectedcell.has(e.target)) {
        e.target.classList.remove('selected');
        selectedcell.delete(e.target);
    } else {
        e.target.classList.add('selected');
        selectedcell.add(e.target);
    }
}

// Function to toggle bold style
boldIcon.addEventListener('click', function() {
    selectedcell.forEach(cell => {
        if (cell.style.fontWeight === 'bold') {
            cell.style.fontWeight = 'normal'; // Remove bold
        } else {
            cell.style.fontWeight = 'bold'; // Add bold
        }
    });
});

// Function to toggle italic style
italicIcon.addEventListener('click', function() {
    selectedcell.forEach(cell => {
        if (cell.style.fontStyle === 'italic') {
            cell.style.fontStyle = 'normal'; // Remove italic
        } else {
            cell.style.fontStyle = 'italic'; // Add italic
        }
    });
});

// Function to open color picker and change text color
colorButton.addEventListener('click', function() {
    colorPicker.click(); // Programmatically open hidden color picker
});

// When a color is selected, apply it to the selected cells
colorPicker.addEventListener('input', function() {
    let selectedColor = colorPicker.value; // Get the selected color
    selectedcell.forEach(cell => {
        cell.style.color = selectedColor; // Apply selected color to the text
    });
});

// Function to handle zoom functionality
zoomSelect.addEventListener('change', function() {
    let zoomLevel = zoomSelect.value; // Get the selected zoom level
    grid.style.transform = `scale(${zoomLevel})`; // Apply scale transform
    grid.style.transformOrigin = "top left"; // Set origin for scaling
});

// Function to increase font size
increaseFontButton.addEventListener('click', function() {
    selectedcell.forEach(cell => {
        let currentSize = window.getComputedStyle(cell).fontSize; // Get current font size
        let newSize = parseFloat(currentSize) * 1.1; // Increase size by 10%
        cell.style.fontSize = newSize + 'px'; // Set new font size
    });
});

// Function to decrease font size
decreaseFontButton.addEventListener('click', function() {
    selectedcell.forEach(cell => {
        let currentSize = window.getComputedStyle(cell).fontSize; // Get current font size
        let newSize = parseFloat(currentSize) * 0.9; // Decrease size by 10%
        cell.style.fontSize = newSize + 'px'; // Set new font size
    });
});

// Initial creation of headers and the first 100 rows
createColumnHeaders();
createRows(1, 1000);
