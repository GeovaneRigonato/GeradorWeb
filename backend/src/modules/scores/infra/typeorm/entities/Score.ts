import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Activity } from "@modules/activity/infra/typeorm/entities/Activity";

@Entity("scores")
class Score {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  score: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  @ManyToOne(() => Activity)
  @JoinColumn({ name: "activity_id" })
  activity: Activity;

  @Column()
  activity_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export { Score };
