export class ClientFee {
cpfCnpj?: string;
email?: string;
razaoSocial?: string;
telefone?: string;
debito?: string;
credito?: string;
parcelado3?: string;
parcelado6?: string;
parcelado12?: string;
modelo!: {id:string, nome: string, valor: number};
quantidade!: number;
total!: number;
faturamento!: number;
}