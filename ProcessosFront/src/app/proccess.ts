export class Proccess {
  id: number;
  name: string;
  startDate: Date;
  judge: string;
  status: string;
  documents: string[];

  constructor(
    id: number,
    name: string,
    judge: string,
  ) {
    this.id = id;
    this.name = name;
    this. judge = judge;
    this.startDate = new Date();
    this.status = "em andamento";
    this.documents = [];
  }
}

