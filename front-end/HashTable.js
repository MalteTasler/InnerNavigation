class HashTable{
    constructor(size=50){
      this.buckets =  new Array(size)
      this.size = size
    }
  
    hash(key){
        let stringArray;
        let sum = 0;
        stringArray = key.toString().split();
        stringArray.forEach(individual => {
            sum += individual.charCodeAt(0);
        })
      return key.toString().length *sum % this.size;
    }
    
    // Insert data
    setItem(key,value){
      let index = this.hash(key);
      
      if(!this.buckets[index]){
        this.buckets[index] = [];
      }
      
      this.buckets[index][0] = ([key,value])
      return index
    }
  
    // Search data
    getItem(key){
      let index = this.hash(key);
    
       if(!this.buckets[index])return null
       
          for(let bucket of this.buckets[index]){
               // key
            if(bucket [0] === key){
               // value
              return bucket [1]
             }
          }
    }
    getAllItems(){
        let array = [];
        for (let bucket of this.buckets)
        {
            console.log("bucket ", bucket, "parent ", this.buckets)
            for(let bucketTwo of bucket)
            {
                array.push(bucketTwo [1]);
            }
        }
        return(array);
    }
  }
  export default HashTable