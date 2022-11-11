function getName(id) {
    fetch(`/api/card/:${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((data) => {
        $(`.list${id}`).append(data.name);
    })
}