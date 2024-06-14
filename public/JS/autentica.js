import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from './conexao.js';

// Obtém os elementos do formulário
const message = document.getElementById('message');
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const welcomeMessage = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('logoutBtn');

// Função para criar um novo usuário
const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            message.textContent = 'Usuário criado com sucesso: ' + user.email;
            displayWelcomeMessage(user);
        })
        .catch((error) => {
            const errorMessage = error.message;
            message.textContent = 'Erro: ' + errorMessage;
        });
};

// Função para fazer login de usuário
const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            displayWelcomeMessage(user);
        })
        .catch((error) => {
            const errorMessage = error.message;
            message.textContent = 'Erro: ' + errorMessage;
        });
};

// Função para exibir a mensagem de boas-vindas e redirecionar o usuário
const displayWelcomeMessage = (user) => {
    message.textContent = '';
    welcomeMessage.innerHTML = `
        Bem-vindo, ${user.displayName || user.email}!<br>
        <button id="go-to-inicio" class="btn btn-outline-success font-monospace mt-3">Ir para o início</button>
    `;
    
    const goToInicioBtn = document.getElementById('go-to-inicio');
    goToInicioBtn.addEventListener('click', () => {
        window.location.href = 'https://armeiromaster2024.web.app/inicio.html';
    });
};

// Adiciona ouvintes de evento aos botões
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    signUp(email, password);
});

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    login(email, password);
});

// Observador de estado de autenticação
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log('Usuário logado com UID:', uid);
        displayWelcomeMessage(user);
    } else {
        console.log('Usuário deslogado');
    }
});

// Função para login com Google
const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            displayWelcomeMessage(user);
        })
        .catch((error) => {
            const errorMessage = error.message;
            message.textContent = 'Erro: ' + errorMessage;
        });
};

googleLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginWithGoogle();
});

// Função de logout
logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        message.textContent = 'Usuário deslogado com sucesso.';
        welcomeMessage.textContent = '';
    }).catch((error) => {
        message.textContent = 'Erro ao deslogar: ' + error.message;
    });
});
