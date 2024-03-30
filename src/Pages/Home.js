import { useAuth } from "../Providers/AuthProvider";

export const Home = () => {
  const { getCategoryImageObject, getSliderImageObject } = useAuth();
  const entries = Object.entries(getCategoryImageObject);

  return (
    <>
      <h1 className="text-center text-5xl my-1">{"<- CATEGORIES ->"}</h1>
      {/* <div className="flex flex-wrap">
        {getSliderImageObject.map((link) => (
          <img style={{ width: "400px" }} src={link} />
        ))}
      </div> */}
      <ul className="flex flex-wrap justify-evenly">
        {entries.map(([key, value]) => (
          <li className="text-center ">
            <img style={{ height: "500px", width: "450px" }} src={value} />
            <span className="text-lg text-gray-800">{key}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
