export class ClientFee {
cpfCnpj?: string;
email?: string;
razaoSocial?: string;
telefone?: string;
debito?: string;
credito?: string;
parcelado?: string; 
modelo!: {id:string, nome: string, valor: number};
quantidade!: number;
total!: number;
}