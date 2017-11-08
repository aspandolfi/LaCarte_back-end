import { Service } from "typedi";

@Service()
export class ResponseData {
  constructor() {
    this.mensagens = new Array();
  }
  status: boolean = true;
  objeto: any;
  mensagens: string[];
}
