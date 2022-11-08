console.log('Byue')

const messageFRM = document.getElementById("message-form")

messageFRM.addEventListener("submit", function(event) {
  event.preventDefault();

  const submitted = event.target[0].value

  fetch('/api/chat', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify({data: submitted}),
  
  })
  .then((res) => res.json())
  .then((data) => {
    console.log('Successful POST request:', data);
    return data;
  })
  .catch((error) => {
    console.error('Error in POST request:', error);
  });
})



//chatstarter.js:9 Uncaught TypeError: Cannot read properties of undefined (reading 'val') at HTMLFormElement.<anonymous> (chatstarter.js:9:31)

