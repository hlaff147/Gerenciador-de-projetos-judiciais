export interface Process {
  id?: number;
  name: string;
  startDate?: Date;
  status?: string;
  judgeId?: number;
  authorId: number;
  defendantId?: number;
  defendantCpf: string;
}
