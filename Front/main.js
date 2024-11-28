

// logar
async function login(email, senha) { 
  try {
    const response = await axios.post('http://localhost:3000/login', {
      email,
      senha,
    });

    const data = response.data;

    if (data.token) {

      localStorage.setItem('token', data.token);

   
      if (data.isAdmin) {
        alert('Login como administrador realizado com sucesso!');
     
        window.location.href = '/admin.html';  
      } else {
        alert('Login realizado com sucesso!');
        
 
        window.location.href = '/todo.html';  
      }
    } else {
      alert('Erro: Token não recebido.');
    }
  } catch (error) {
    console.error('Erro no login:', error);
    alert('Erro ao fazer login. Verifique suas credenciais.');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        await login(email, password); 
      } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro ao fazer login.');
      }
    });
  }
});



  //cadastrar usuario
  document.addEventListener('DOMContentLoaded', function () {
    const signUpForm = document.getElementById('signUpForm'); 

    if (signUpForm) {
        signUpForm.addEventListener('submit', async function (event) {
            event.preventDefault(); 

            
            const nome = document.getElementById('Nome').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const senha = document.getElementById('signup-password').value.trim();
            const isAdmin = document.querySelector('input[name="isAdmin"]:checked').value === 'true';

            console.log('Dados capturados:', { nome, email, senha, isAdmin }); 

        
            if (!nome || !email || !senha) {
                alert('Por favor, preencha todos os campos!');
                return;
            }

            try {
              
                const response = await axios.post('http://localhost:3000/cadastro', {
                    nome,
                    email,
                    senha,
                    isAdmin
                });

           
                alert('Cadastro realizado com sucesso!');
                console.log('Resposta do servidor:', response.data);

           
                signUpForm.reset();
            } catch (error) {
               
                console.error('Erro ao cadastrar usuário:', error.response?.data || error.message);
                alert('Erro ao tentar cadastrar: ' + (error.response?.data?.message || 'Erro desconhecido.'));
            }
        });
    } else {
        console.error('Formulário de cadastro não encontrado no DOM.');
    }
});






//listar usuarios como adm

document.addEventListener('DOMContentLoaded', function () {

  const adminContainer = document.getElementById('admin-container');
  if (adminContainer) {
    const token = localStorage.getItem('token');

    
    if (!token) {
      alert('Você precisa estar logado para acessar essa página.');
      window.location.href = 'index.html'; 
      return;
    }

    listarUsuarios();
  }
});

async function listarUsuarios() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/usuarios', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const usuarios = response.data;
    const tabelaBody = document.querySelector('#user-table tbody');
    tabelaBody.innerHTML = '';
    usuarios.forEach(usuario => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>${usuario.isAdmin ? 'Administrador' : 'Usuário'}</td>
      `;
      tabelaBody.appendChild(row);
    });

    document.getElementById('admin-container').style.display = 'block';
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    alert('Erro ao carregar usuários.');
  }
}
//sair
document.addEventListener('DOMContentLoaded', function () {
  const logoutButton = document.getElementById('logoutButton');

  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      localStorage.removeItem('token');

      const adminContainer = document.getElementById('admin-container');
      if (adminContainer) {
        adminContainer.style.display = 'none';
      }

      window.location.href = 'index.html'; 
    });
  }
});





 