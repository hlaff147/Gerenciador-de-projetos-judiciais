export interface Document {
  id?: number;
  name: string;
  data: any;
  datePosted?: Date;
  postedBy: number;
  processId: number;
}
