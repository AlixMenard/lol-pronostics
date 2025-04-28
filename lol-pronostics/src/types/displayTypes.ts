import { Match } from './index';

export interface DisplayMatch extends Omit<Match, 'team1' | 'team2'> {
  team1: string;
  team2: string;
}
