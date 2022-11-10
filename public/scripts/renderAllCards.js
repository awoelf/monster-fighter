function renderAllCards() {
    let cardHtml = ``
    for (i=1; i<335; i++){
        cardHtml += `{{> card uniqueId=${i}}}`;
    }
    $('#allCards').html(cardHtml);
}