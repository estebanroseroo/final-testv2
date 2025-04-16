import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { Personal } from "../personal";

@Entity()
export class ProductionStaff {
  @PrimaryColumn()
  UnionID: number;

  @Column({ length: 50 })
  Role: string;

  @OneToOne(() => Personal)
  @JoinColumn({ name: "UnionID" })
  personal: Personal;
}
