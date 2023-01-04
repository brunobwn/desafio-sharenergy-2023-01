import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { query } from 'express';
import { type } from 'os';

export class migrations1672869844591 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: '_id', type: 'number', isPrimary: true, generationStrategy: 'increment' },
          { name: 'username', type: 'string', isNullable: false },
          { name: 'password', type: 'string', isNullable: false },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
