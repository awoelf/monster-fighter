const startBattle = () => {
    document.location.replace('/battlefield');
}

$('#ready-btn').on('click', () => {
    startBattle();
})

$('#add-btn').on('click', () => {
    $('#cards-selected').text('0/5 Cards selected')
    $('.add-card-checkbox').prop('checked', false);
})

$('#delete-btn').on('click', () => {
    $('.delete-deck-input').prop('checked', false);
})

$('.add-card-checkbox').on('click', () => {
    $('#cards-selected')
    .text(`${$('.add-card-checkbox').filter(':checked').length}/5 Cards selected`)
})