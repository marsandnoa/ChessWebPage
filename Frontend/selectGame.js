
//js to populate table from api request
function displayGames(games) {
    const tableBody = document.getElementById('gameTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    
    const gameSelect = document.getElementById('gameSelect');
    gameSelect.innerHTML = ''; 
    
    games.forEach((game, index) => {
        const row = tableBody.insertRow();
        const idCell = row.insertCell(0);
        const nameCell = row.insertCell(1);

        idCell.textContent = index+1;
        nameCell.textContent = game.name;

        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Game ${index+1}`;
        gameSelect.appendChild(option);
    });

    gameSelect.addEventListener('change', (event) => {
        let selectedGameIndex = event.target.value;
        selectedGameIndex=parseInt(selectedGameIndex)+1;
        document.getElementById('selectedGameIndex').value = selectedGameIndex;
    });
}

fetch('/api/findall')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response JSON
    })
    .then(data => {
        displayGames(data); // Call displayGames after fetching data
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });