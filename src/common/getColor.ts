const getColor = (value: number): string => {
    if (value > 0.75){
      return "red"
    } 
    if (value > 0.40) {
      return "orange"
    } 
    if (value > 0.15) {
      return "yellow"
    } 
    
    return "green"
}

export default getColor;