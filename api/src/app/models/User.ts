import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  username: string;

  @Column()
  password: string;

  constructor(username: string, password: string) {
    this._id = new ObjectID();
    this.username = username;
    this.password = password;
  }
}
