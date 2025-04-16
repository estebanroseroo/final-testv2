import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Personal {
  @PrimaryGeneratedColumn()
  UnionID: number;

  @Column({ length: 50 })
  Name: string;

  @Column({ type: "date" })
  DateOfBirth: Date;

  @Column({ length: 50 })
  Nationality: string;

  @Column({ length: 100 })
  Biography: string;

  @Column({ length: 100 })
  ContactInfo: string;
}
