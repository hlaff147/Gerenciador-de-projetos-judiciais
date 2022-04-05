export class Document {
  id: number;
  name: string;
  proccessId: number;

  constructor(id: number, name: string, proccessId: number) {
    this.id = id;
    this.name = name;
    this.proccessId = proccessId;
  }
}
