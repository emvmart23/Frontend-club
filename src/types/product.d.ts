interface Product {
  id: number;
  name: string;
  price?: number;
  category_id: number;
  unit_id: number;
  has_alcohol: boolean;
  unit_name?: string;
  category_name?: string;
  count: number;
  initialPrice?: number;
  totalPrice?: number;
}

interface UnitMeasure {
  unit_id: number;
  abbreviation: string;
  description: string;
}

interface Orders {
  name: string;
  total_price: number;
  count:number;
  hostess: string;
}

interface Header {
  id: number;
  mozo: string;
  count: number;
  total_price: number;
  orders: Orders[];
  state:number
}
