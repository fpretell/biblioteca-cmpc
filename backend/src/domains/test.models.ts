import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'test', timestamps: false }) // 👈 usamos nombre exacto
export class Test extends Model {
  @Column
  nombre!: string;
}
