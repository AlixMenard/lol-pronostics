export const getTeamName = (team: any): string => {
  if (typeof team === 'string') return team;
  if (Array.isArray(team)) {
    for (const value of team) {
      const name = getTeamName(value);
      if (name !== 'TBD') return name;
    }
  }
  if (team && typeof team === 'object') {
    for (const value of Object.values(team)) {
      const name = getTeamName(value);
      if (name !== 'TBD') return name;
    }
    const keys = Object.keys(team);
    if (keys.length > 0) return keys[0];
  }
  return 'TBD';
};

export {};
