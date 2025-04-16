import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Personal } from "../personal";
import { Movie } from "../movie";

@Entity()
export class Involvement {
  @PrimaryGeneratedColumn()
  InvolvementID: number;

  @Column()
  UnionID: number;

  @Column()
  MovieID: number;

  @ManyToOne(() => Personal)
  @JoinColumn({ name: "UnionID" })
  personal: Personal;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: "MovieID" })
  movie: Movie;
}
