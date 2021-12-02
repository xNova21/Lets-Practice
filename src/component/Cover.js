import Navba from "./Navba"
import '../App.css';

const Cover = () =>{
    window.localStorage.clear();
    return <div className="background">
        <Navba loged={false}/>
    </div>
}
export default Cover