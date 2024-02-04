import { Topic } from "../feature/topics/interfaces/topic.interface";

export interface User {
	id: number,
	userName: string,
	email: string,
	created_at: Date,
	updated_at: Date, 
	topics: Topic[]
}