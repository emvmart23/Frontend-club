interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
  unit_id: number;
  has_alcohol: boolean;
  unit_name: string;
  category_name: string;
  count: number;
  initialPrice: number;
}

interface UnitMeasure {
  unit_id: number;
  abbreviation: string;
  description: string;
}
