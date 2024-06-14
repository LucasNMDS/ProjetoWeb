const database = firebase.database();

// Captura o formulário
const contactForm = document.getElementById('contactForm');

// Adiciona um ouvinte para o evento de envio do formulário
contactForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o comportamento padrão de recarregar a página

  // Captura os valores dos campos do formulário
  const name = contactForm.querySelector('#nameInput').value;
  const email = contactForm.querySelector('#emailInput').value;
  const message = contactForm.querySelector('#messageInput').value;

  // Cria um objeto com os dados do formulário
  const formData = {
    name,
    email,
    message
  };

  // Envia os dados para o Firebase Realtime Database
  database.ref('mensagens').push(formData)
    .then(() => {
      // Limpa os campos do formulário após o envio
      contactForm.reset();
      alert('Mensagem enviada com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao enviar mensagem:', error);
      alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
    });
});
