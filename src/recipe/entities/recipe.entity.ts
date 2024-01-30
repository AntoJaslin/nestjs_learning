import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id'])
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'tinyint', default: 0 })
  is_active: number;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  public bind(data: Partial<Recipe>): this {
    if (data?.id) this.id = data.id;
    if (data?.name) this.name = data.name;
    if (data?.description) this.description = data.description;
    if (data?.is_active) this.is_active = data.is_active;
    if (data?.created_at) this.created_at = data.created_at;
    if (data?.updated_at) this.updated_at = data.updated_at;
    return this;
  }
}
