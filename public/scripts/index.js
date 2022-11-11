let addDeckModal = new bootstrap.Modal($('#create-deck'), {
    keyboard: false
})

let deleteDeckModal = new bootstrap.Modal($('#delete-deck'), {
    keyboard: false
})


const startBattle = () => {
    document.location.replace('/battlefield');
}

$('#ready-btn').on('click', () => {
    startBattle();
})

$('#add-btn').on('click', () => {
    $('#cards-selected').text('0/5 Cards selected')
    $('.add-card-checkbox').prop('checked', false);
    $('#create-deck-btn').prop('disabled', false);
    $('#deck-name').val('');
})

$('#create-deck-btn').on('click', () => {
    let deckName = $('#deck-name').val();
    let selectedCards = [];
    $('.add-card-checkbox :checked').each(() => {
        selectedCards.push($(this).attr('name'));
    });

    fetch('/api/deck/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({cards: selectedCards, name: deckName })
    })
    .then(addDeckModal.toggle())
})

$('#delete-btn').on('click', () => {
    $('.delete-deck-input').prop('checked', false);
})

$('.add-card-checkbox').on('click', () => {
    $('#cards-selected')
    .text(`${$('.add-card-checkbox').filter(':checked').length}/5 Cards selected`)

    if ($('.add-card-checkbox').filter(':checked').length >= 5) {
        $('.add-card-checkbox').prop('disabled', true)
        if ($('#deck-name').val()) {
            $('#create-deck-btn').prop('disabled', false);
        }
    }
})