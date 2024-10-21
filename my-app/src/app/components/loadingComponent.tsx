import * as React from "react";
import { Circles, InfinitySpin, TailSpin, ThreeDots } from "react-loader-spinner";


interface LoadingProps {
  isLoading?: any; // Making the prop optional
}



const LoadingComponent: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <ThreeDots
          width="55"
          color="white"
        />

  );
}

export default LoadingComponent