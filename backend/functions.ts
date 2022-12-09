export function arithmetic(
  index: number,
  start: number,
  common: number
) {
  let array: number[] = [];
  for (let i = 1; i <= index; i++) {
    let value = start + common * i;
    array.push(value);
  }
  return array[array.length - 1];
}

export function geometric(
    index: number,
    start: number,
    common: number
  ) {
    let newArray: number[] = [];
    for (let i = 1; i <= index; i++) {
      let geometricValue = start * (common * i);
      newArray.push(geometricValue);
    }
    return newArray[newArray.length - 1];
  }

export function fibbonaci(index:number){
    let newArray:number[]=[]
        if(index===1)newArray.push(0)
        else if(index===2){
            newArray.push(0)
            newArray.push(1)

        }
        else{
            for(let i=2;i<=index;i++){
                if(i===2){
                    newArray.push(0)
                    newArray.push(1)
                }
                newArray.push(newArray[i-1]+newArray[i-2])
            }
        } 

        
    console.log(newArray)
    return newArray[newArray.length - 1];

}
