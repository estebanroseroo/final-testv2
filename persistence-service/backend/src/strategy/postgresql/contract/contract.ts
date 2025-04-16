import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Personal } from "../personal";
import { Movie } from "../movie";

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  ContractID: number;

  @Column()
  UnionID: number;

  @Column()
  MovieID: number;

  @Column("decimal", { precision: 10, scale: 2 })
  Cost: number;

  @ManyToOne(() => Personal)
  @JoinColumn({ name: "UnionID" })
  personal: Personal;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: "MovieID" })
  movie: Movie;
}
