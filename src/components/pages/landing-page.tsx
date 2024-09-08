import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Warning <span className="text-[hsl(280,100%,70%)]">contains</span> Gifs
      </h1>
      <div>
        <a href="/signin">Sign In</a>
      </div>
    </div>
  );
};

export default LandingPage;
