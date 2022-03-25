const getDifficultyText = (value: number): string => {
    if (value > 0.85){
      return 'Very Low'
    } 
    if (value > 0.60) {
      return 'Low'
    } 
    if (value > 0.25) {
      return 'Normal'
    } 
    
    return 'Very Hight'
}

export default getDifficultyText;