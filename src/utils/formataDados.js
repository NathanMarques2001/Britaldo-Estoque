export function traduzPermissao(permissao) {
  if (permissao === 'Superadmin') {
    return permissao = 'Super Administrador'
  } else if (permissao === 'Admin') {
    return permissao = 'Administrador'
  }
  else if (permissao === 'User') {
    return permissao = 'Usuário'
  }
  else if (permissao === 'New User') {
    return permissao = 'Novo Usuário'
  }
  else if(permissao === 'Dev') {
    return permissao = 'Desenvolvedor'
  }
}