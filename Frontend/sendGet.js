// Send a GET request using the fetch API
function getGame(){
    console.log('getGame() function is being called'); 
    fetch('http://localhost:8080/findall')
    .then(response => {
        // Check if the response status is in the successful range
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        // Parse the response as JSON
        return response.json();
    })
    .then(data => {
        // Handle the JSON data here
        console.log('Received data:', data);
        // You can work with the 'data' object here
    })
    .catch(error => {
        // Handle errors here
        console.error('Fetch error:', error);
    });
}

getGame();