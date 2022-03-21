const getTextPrice = (value: number): string => {
    if (value > 0.75){
      return 'Expensive'
    } 
    if (value > 0.40) {
      return 'Normal'
    } 
    if (value > 0.01) {
      return 'Cheap'
    } 
    
    return 'Free'
  }

export default getTextPrice;