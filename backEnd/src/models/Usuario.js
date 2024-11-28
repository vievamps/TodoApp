import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const usuarioSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, 
  },
});
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) {
      return next();
    }

  try {
 
    const salt = await bcrypt.genSalt(10);

    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }

});



usuarioSchema.methods.validatePassword = async function validatePassword(senha) {
  console.log("Senha fornecida:", senha); // Log da senha fornecida
  console.log("Hash armazenado:", this.senha); // Log do hash armazenado

  return bcrypt.compare(senha, this.senha);
};

  export const Usuario = mongoose.model('Usuario', usuarioSchema)