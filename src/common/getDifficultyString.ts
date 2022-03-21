const getDifficultyText = (value: number): string => {
    if (value > 0.75){
      return 'Very Hard'
    } 
    if (value > 0.40) {
      return 'Hard'
    } 
    if (value > 0.15) {
      return 'Normal'
    } 
    
    return 'Easy'
}

export default getDifficultyText;