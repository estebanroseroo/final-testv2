import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  MovieID: number;

  @Column({ length: 100 })
  Title: string;

  @Column({ type: "date" })
  ReleaseDate: Date;

  @Column("int")
  AwardsWon: number;
}
