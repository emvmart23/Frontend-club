interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
  unit_id: number;
  has_alcohol: boolean;
}

interface UnitMeasure {
  unit_id: number;
  abbreviation: string;
  description: string;
}

interface Order {
  id: number;
  name: string;
  price: number;
  count: number;
}
