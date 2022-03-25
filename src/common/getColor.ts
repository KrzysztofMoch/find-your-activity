const getColor = (value: number): string => {
    if (value > 0.85){
      return "red"
    } 
    if (value > 0.60) {
      return "orange"
    } 
    if (value > 0.25) {
      return "yellow"
    } 
    
    return "green"
}

export default getColor;