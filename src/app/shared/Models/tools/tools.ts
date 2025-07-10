
export interface arrestDocument{

    id:number,
    voucherNumber:string,
    voucherDate:string,
    amount:number,
    accountsId:number,
    tenantId:number,
    description:string,
    accountName:string,
    tenantName:string

}


export interface Accounts{
    id:number,
    accountName:string,
    accountType:string,
    accountNumber:string,
    ibanNumber:string

}


export interface exchange{
       id: number,
      voucherNumber:string,
      voucherDate: string
      amount: number,
      accountsId: number,
      serviceId: number,
      description: string,
      accountName:string,
      serviceName:string
}