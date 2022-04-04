import { Proccess } from './proccess';

export const PROCCESSES: Proccess[] = [
  {
    id: 6, name: "Processo Judicial 7", startDate: new Date(2015, 8, 9),
    judge: "Fulano Detal", status: "concluído",
    documents: []
  },
  { id: 5, name: "Processo Judicial 6", startDate: new Date(2012, 9, 17),
    judge: "Humberto Filho", status: "atrasado",
    documents: []
  },
  { id: 4, name: "Processo Judicial 5", startDate: new Date(2009, 2, 16),
    judge: "Lucca di Francesco", status: "atrasado",
    documents: []
  },
  { id: 3, name: "Processo Judicial 4", startDate: new Date(2008, 8, 11),
    judge: "Fulano Detal", status: "em andamento",
    documents: []
  },
  { id: 2, name: "Processo Judicial 3", startDate: new Date(2007, 7, 12),
    judge: "Fulano Detal", status: "em andamento",
    documents: []
  },
  { id: 1, name: "Processo Judicial 2", startDate: new Date(2006, 3, 10),
    judge: "Marco Sena", status: "concluído",
    documents: []
  },
  { id: 0, name: "Processo Judicial 1", startDate: new Date(2005, 5, 18),
    judge: "Sergio Barreto", status: "atrasado",
    documents: [
      "Documento 1", "Documento 2", "Documento 3", "Documento 4", "Documento 5",
      "Documento 6", "Documento 7", "Documento 8", "Documento 9", "Documento 10",
    ]
  },
]
