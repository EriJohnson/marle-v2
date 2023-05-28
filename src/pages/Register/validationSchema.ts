import * as Yup from 'yup';

import { ptShort } from 'yup-locale-pt';

Yup.setLocale(ptShort);

const birthdateRegex = /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/;
const phoneRegex = /\([0-9]{2}\) [0-9]{5}-[0-9]{4}/;

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required().min(8).max(64),
  email: Yup.string().required().email(),
  birthdate: Yup.string()
    .required()
    .matches(birthdateRegex, 'Digite uma data no formato: DD/MM/AAAA'),
  phone: Yup.string()
    .required()
    .matches(phoneRegex, 'Digite um telefone no formato: (XX) 9XXXX-XXXX'),
  username: Yup.string().required().min(6).max(24),
  password: Yup.string().required().min(8).max(24),
});

export default validationSchema;
