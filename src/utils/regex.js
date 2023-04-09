export function validateEmail(email) {
  const regex = /^([a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,})$/

  if (regex.test(email)) {
    return true
  }
  return false
}

export function validatePassword(password) {
  const regex = /^[a-zA-Z0-9._%+-=?*&@!]{6,}$/

  if (regex.test(password)) {
    return true
  }
  return false
}
