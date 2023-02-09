import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IUser } from "../interfaces/user.interface";

export type UserDocument = HydratedDocument<IUser>;

@Schema()
export class User {
  @Prop({ require: true })
  id: string;

  @Prop({ require: true })
  username: string;

  @Prop({ require: true })
  email: string;

  @Prop({ require: true })
  password: string;

  @Prop()
  address: string;

  @Prop()
  website: string;

  @Prop()
  bank_name: string;

  @Prop()
  bank_account: string;

  @Prop()
  logo_url: string;
}

export const userSchema = SchemaFactory.createForClass(User);
