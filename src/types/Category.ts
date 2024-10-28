export interface Results {
  data: Category[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: Category;
  links: Links;
  meta: Meta;
}

export interface Category {
  id: string;
  name: string;
  description: null | string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export interface Links {
  first: string;
  last: string;
  next: null | string;
  prev: null | string;
}

export interface Meta {
  to: number;
  from: number;
  path: string;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
}
