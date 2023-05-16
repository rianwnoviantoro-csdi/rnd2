import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tags")
export class TagModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: null })
  updatedAt: Date;
}
