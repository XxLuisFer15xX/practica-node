import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import { Type } from '@sinclair/typebox';

const LoginDTOSchema = Type.Object(
  {
    email: Type.String({
      format: 'email',
      errorMessage: {
        type: 'Debe ser un string',
        format: 'Debe ser un correo electrónico válido',
      },
    }),
    password: Type.String({
      errorMessage: {
        type: 'Debe ser un string',
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      type: 'Debe ser un objeto',
      additionalProperties: 'El formato del objeto no es válido',
      required: {
        email: 'El email es requerido',
        password: 'La password es requerido',
      },
    },
  },
);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv, { keepErrors: false });
const validate = ajv.compile(LoginDTOSchema);

const validateLoginDTO = (req, res, next) => {
  const isDTOValid = validate(req.body);
  if (!isDTOValid)
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: '\n' }));
  return next();
};

export default validateLoginDTO;
