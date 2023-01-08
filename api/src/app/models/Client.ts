import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity('clients')
export class Client {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  cpf: string;

  constructor(nome: string, email: string, telefone: string, cpf: string) {
    this._id = new ObjectID();
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.cpf = cpf;
  }
}
