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
