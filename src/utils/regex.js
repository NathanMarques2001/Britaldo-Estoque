export function validaEmail(email) {
  const regex = /^([a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,})$/

  if (regex.test(email)) {
    return true
  }
  return false
}

export function validaSenha(senha) {
  const regex = /^[a-zA-Z0-9._%+-=?*&@!]{6,15}$/

  if (regex.test(senha)) {
    return true
  }
  return false
}
