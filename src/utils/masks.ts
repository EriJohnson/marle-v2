export function phone(value: string) {
  if (!value) return '';

  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{2})(\d)/, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d{5})(\d)/, '$1-$2') // Coloca hífen entre o quarto e o quinto dígitos
    .replace(/(-\d{4})\d+?$/, '$1'); // Não deixa digitar mais de 9 dígitos
}

export function date(value: string) {
  if (!value) return '';

  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{2})(\d)/, '$1/$2') // Coloca barra entre o segundo e o terceiro dígitos
    .replace(/(\d{2})(\d)/, '$1/$2') // Coloca barra entre o quarto e o quinto dígitos
    .replace(/(\/\d{4})\d+?$/, '$1'); // Não deixa digitar mais de 9 dígitos
}
