export class Transaction {

  public type: string;
  public description: string;
  public amount: number;
  public date: Date;
  public expanded = false;

  constructor(type: string, amount: number, date: Date, description?: string) {
    this.type = type;
    this.description = description;
    this.amount = amount;
    this.date = date;
  }

}
