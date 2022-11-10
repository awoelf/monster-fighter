// const { METHODS } = require("http");

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
})

$('#create-deck-btn').on('click', () => {
    let deckName = $('#deck-name').val();
    let selectedCards = [];
    $('.add-card-checkbox :checked').each(() => {
        selectedCards.push($(this).attr('name'));
    });
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