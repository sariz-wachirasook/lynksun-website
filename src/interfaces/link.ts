import { ListResponseType } from './response';

export interface LinksType extends ListResponseType {
  data: LinkType[];
}
export interface LinkType {
  id?: number;
  name?: string | null;
  user_id?: number | null;
  url: string;
  short_url?: string | null;
  visit_count?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  expires_at?: string | null;
}

export interface LinkParamsType {
  url: string;
}
