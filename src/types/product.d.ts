interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
  unit_id: number;
  has_alcohol: boolean;
  count: number;
}

interface UnitMeasure {
  unit_id: number;
  abbreviation: string;
  description: string;
}
