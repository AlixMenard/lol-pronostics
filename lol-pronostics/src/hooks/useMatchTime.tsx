export const useMatchTime = () => {
    const getAdjustedMatchTime = (dateString: string, bo: number, isFirst: boolean) => {
      const matchDate = new Date(dateString);
      const offsetInMinutes = matchDate.getTimezoneOffset();
      const hoursToAdd = offsetInMinutes === -120 ? 2 : 1;
      
      matchDate.setHours(matchDate.getHours() + hoursToAdd);
      
      if (!isFirst) {
        const advanceMinutes = bo === 1 ? 15 : bo === 3 ? 30 : 60;
        matchDate.setMinutes(matchDate.getMinutes() - advanceMinutes);
      }
      
      return matchDate;
    };
  
    return { getAdjustedMatchTime };
  };