
function createCard (id) {
    console.log(`Creating card with id of ${id}`)
    fetch(`/api/card/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
    .then((res) => res.json())
    .then((data) => {
        $(`#monster-name${id}`).text(data[0].name);
        $(`#monster-health${id}`).text(data[0].hitpoints);
        $(`#monster-defense${id}`).text(data[0].armor);
        $(`#monster-attack${id}`).text(data[0].damage);
        if (data[0].image) {
            $(`#monster-image${id}`).attr('src', `https://www.dnd5eapi.co${data[0].image}`)
        } else {
            $(`#monster-image${id}`).attr('src', '/assets/generic.jpeg')
        }
    })
}

