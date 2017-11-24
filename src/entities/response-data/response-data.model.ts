import { Service } from "typedi";

@Service()
export class ResponseData {
  constructor() {
    this.mensagens = [];
  }
  status: boolean = true;
  objeto: any;
  mensagens: string[];
}
