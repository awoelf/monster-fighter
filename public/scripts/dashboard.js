const startBattle = async (event) => {
    event.preventDefault();
    const deck = $('input[name="choose-deck"]:checked').val();
    const response = await fetch('/api/users/deck', {
        method: 'POST',
        body: JSON.stringify({deck: deck}),
        headers: {"Content-Type":"application/json"}
    });
    if(response.status === 200)
    {
        document.location.replace('/battlefield');
    } else {
        const responseMessage = await response.json();
        alert(responseMessage.message);
    }
}

$('#ready-btn').on('click', (e) => {
    startBattle(e);
});
