export function findAll(){
    return fetch('http://localhost:8080/findall')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            return data; 
        })
        .catch(error => {
            console.error('Fetch error:', error);
            throw error;
        });
}

export function findId(id){
    fetch('http://localhost:8080/'+id)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Received data:', data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}
export function deleteGame(id) {
    fetch('http://localhost:8080/' + id, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Received data:', data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}