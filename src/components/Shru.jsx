export default function Shru(props){
    const{data}=props
    return(
       <div className="imgc"><img src={data.hdurl} alt="" className="bgImage" /></div>
    )
}