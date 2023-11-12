import { FileEntity } from '../intefaces/file-entity.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File implements FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  creatorId: string;

  @Column()
  originalName: string;

  @Column()
  ext: string;

  @Column()
  size: string;

  @Column()
  path: string;

  get name() {
    return `${this.id}${this.ext}`;
  }

  get url() {
    return `${this.path}/${this.name}`;
  }
}
