import type { Contract as Start } from '../../snapshots/a61cc97581adfd2ee1bb9b4b6ef08f6542469844fc7b8b03839722cc9cca10db/contract';
import startContract from '../../snapshots/a61cc97581adfd2ee1bb9b4b6ef08f6542469844fc7b8b03839722cc9cca10db/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/dfaf887931d62037d298687a6429ab041c9fbd50cfa37ef67a3982b700b1480f/contract';
import endContract from '../../snapshots/dfaf887931d62037d298687a6429ab041c9fbd50cfa37ef67a3982b700b1480f/contract.json' with { type: 'json' };

import {
  Migration,
  MigrationCLI,
  col,
  primaryKey,
} from '@prisma/orm-postgres/migration';
import postgres from '@prisma/orm-postgres/runtime';

const { sql: db, contract } = postgres<End>({
  contractJson: endContract,
});

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({
        schema: 'public',
        table: 'Post',
        column: 'author',
      }),
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('email', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('id', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('password', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addColumn({
        schema: 'public',
        table: 'Post',
        column: col('authorId', 'int4', {
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
      this.dataTransform(contract, 'handle-nulls-Post-categoryId', {
        check: () =>
          db.public.Post
            .select('id')
            .where((f, fns) => fns.eq(f.categoryId, null))
            .limit(1),
        run: () =>
          db.public.Post
            .update({ categoryId: 1 })
            .where((f, fns) => fns.eq(f.categoryId, null)),
      }),
      this.setNotNull({
        schema: 'public',
        table: 'Post',
        column: 'categoryId',
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Post',
        index: 'Post_authorId_idx_e47547ed',
        columns: ['authorId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Post',
        foreignKey: {
          name: 'Post_authorId_fkey',
          columns: ['authorId'],
          references: {
            schema: 'public',
            table: 'User',
            columns: ['id'],
          },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
