export interface invoiceData {
  // / Seller Data
  SellerCompanyName: string;
  SellerTaxID: string;
  SellerCity: string;
  SellerAddress: string;
  SellerEmail: string;
  SellerPhone: string;

  // / Buyer Data
  BuyerName: string;
  BuyerTaxID: string;
  BuyerEmail: string;
  BuyerCountry: string;
  BuyerCity: string;
  BuyerAddress: string;
  BuyerPhone: string;

  // / 
  currency:string;
  status:string;
  date:Date;
  dueDate:Date;
  paymentMethod:string;

  items: itemData[];
}

interface itemData {
  Item: string;
  Quantity: string;
  Unit: string;
  'Unity Price': string;
  VAT: string;
  'Net Amount': string;
}
