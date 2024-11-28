import mongoose from 'mongoose'

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    console.log('Conectado ao banco de dados')
  } catch (error) {
    console.error(error)
  }
}