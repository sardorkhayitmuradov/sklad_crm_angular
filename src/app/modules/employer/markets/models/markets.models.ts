import { Id } from "src/app/modules/shared/models/id.interface";

export interface Markets extends Id, MarketsRequest {
  debt: number;
}

export interface MarketsRequest {
  market_name: string;
  phone_number: string;
  location: string;
}

