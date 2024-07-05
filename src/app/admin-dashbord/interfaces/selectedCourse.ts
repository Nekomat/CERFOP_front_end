export interface selectdeCourse {
    name:string 
    description:string 
    duree : string 
    photo:string 
    id:number ,
    loader:boolean ,
    userCourse:userCourse

}


interface userCourse {
    id:number,
    userId:number
    coursId:number
    courseCompleted:boolean,
    chapiter:Array<chapiter>
}
interface chapiter {
    id:number
    name:string ,
    videos:Array<video>
}

interface video {
  id:number,
  name:string
  path:string
  duration:number
  is_completed:boolean 
  active:boolean  
  disable:boolean
} 