import mongoose, { Schema, Document } from 'mongoose';
interface IClient extends Document {
  _id: String;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: string;
  createdAt: Date;
  editedAt?: Date;
}

const clientSchema = new Schema<IClient>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  endereco: { type: String, required: true },
  cpf: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  editedAt: { type: Date },
});

export const Client = mongoose.model<IClient>('Client', clientSchema);
