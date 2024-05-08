interface User {
  id: number;
  user:string;
  name:string;
  salary:string;
  profit_margin:number;
  role_id:number;
  is_active:boolean;
}

interface Role { 
  role_id:number;
  role_name:string;
}

interface Attendace {
  id:number;
  user_id:number;
  date:string;
  box_id:number;
  present:boolean;
}

interface Box {
  id:number;
  opening:string;
  closing:string;
  initial_balance:string;
  final_balance:string;
  state:boolean;
}