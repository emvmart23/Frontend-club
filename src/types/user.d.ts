interface User {
  id: number;
  user: string;
  name: string;
  salary: string;
  profit_margin: number;
  role_id: number;
  role:string;
  is_active: number;
}

interface Role {
  role_id: number;
  role_name: string;
}

interface Attendace {
  id: number;
  user_id: number;
  date: string;
  box_id: number;
  box_date: string;
  present: boolean;
  user: string; 
  box_state: number;
  role_user: number;
}

interface Box {
  id: number;
  user_opening: string;
  opening: string;
  closing: string;
  initial_balance: string;
  final_balance: string;
  state: boolean;
}
