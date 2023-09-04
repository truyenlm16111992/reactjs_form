export const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
export const convertStringSearch = (str) => removeAccents(str.toLowerCase())