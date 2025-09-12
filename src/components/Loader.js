import { Oval } from "react-loader-spinner";

const Loader = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <Oval
      height={50}
      width={50}
      color="#ff0000"
      visible
      ariaLabel="oval-loading"
      secondaryColor="#ff4d4d"
      strokeWidth={5}
      strokeWidthSecondary={5}
    />
  </div>
);

export default Loader;
