import Navba from "./Navba";
const AboutMe = () => {
  return (
    <div>{!window.localStorage.token  ? <Navba loged={false}/> : <Navba loged={true}/> }
      
      <div className="about">
        <h1 className="margin">Wellcome to Let's Practice!</h1>
        <div><p className="margin">
          This website was created with React with programm learning porpouses
          as final project for Cooding School Let's Coder.
        </p>
        <p className="margin">
          This project is focussed in learn languages by conversation exchanges.
        </p></div>
      </div>
    </div>
  );
};
export default AboutMe;
