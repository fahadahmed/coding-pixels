import { HeaderCategory } from './HeaderCategory';

export interface Header {
  headerType: string;
  data: Array<HeaderCategory>;
}