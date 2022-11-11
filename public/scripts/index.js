let addDeckModal = new bootstrap.Modal($('#create-deck'), {
    keyboard: false
})

let deleteDeckModal = new bootstrap.Modal($('#delete-deck'), {
    keyboard: false
})

$('#add-btn').on('click', () => {
    $('#cards-selected').text('0/5 Cards selected')
    $('.add-card-checkbox').prop('checked', false);
    $('#create-deck-btn').prop('disabled', false);
    $('#deck-name').val('');
})

$('#create-deck-btn').on('click', () => {
    let deckName = $('input[name="deck-input"]').val();
    if(deckName === "") {
        alert("Please enter a deck name");
        return;
    }
    let selectedCards = [];
    selectedCards = $('input[type=checkbox]:checked').map(function(_, el) {
        return $(el).val();
    }).get();
    fetch('/api/deck/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({cards: selectedCards, name: deckName })
    })
    .then(addDeckModal.toggle()).then(addDeckModal.handleUpdate()).then(document.location.reload());
})

$('#delete-selected-btn').on('click', () => {
    const deckName = $('input[name=choose-deck]:checked').val();
    fetch('/api/deck/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({name: deckName})
    }).catch((err) => {
        alert(err)
    }).then(deleteDeckModal.toggle()).then(deleteDeckModal.handleUpdate()).then(document.location.reload());
})

$('.add-card-checkbox').on('click', () => {
    $('#cards-selected')
    .text(`${$('.add-card-checkbox').filter(':checked').length}/5 Cards selected`)
})