import * as Yup from 'yup';

import { ptShort } from 'yup-locale-pt';

Yup.setLocale(ptShort);

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required(),
  password: Yup.string().required(),
});

export default validationSchema;
