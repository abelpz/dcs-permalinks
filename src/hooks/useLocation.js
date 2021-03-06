import { useEffect, useMemo, useState } from "react";
import { off, on } from "../helpers/events";

// Uses current window location and adds enhanced functionality
export default function useLocation() {
  const [location, setLocation] = useState({
    href: null,
    origin: null,
    protocol: null,
    host: null,
    hostname: null,
    port: null,
    pathname: null,
    search: null,
    hash: null,
    reload: null,
    replace: null
  });

  //Set location on first render
  useEffect(() => {
    setLocation( getCurrentLocation );
  }, []);

  //Add event listeners
  useEffect(() => {
    const updateLocation = () => {
      setLocation( getCurrentLocation );
    };

    //Update location when user navigates using back button
    on("popstate", updateLocation);

    //Update location when new location is pushed to History
    on("locationpush", updateLocation);

    return () => {
      off("popstate", updateLocation);
      off("locationpush", updateLocation);
    };
  }, []);

  //Get path parts from url and add them to an array
  const patharray = useMemo(
    () => (location.pathname && location.pathname !== "/" ? [...location.pathname.split("/").slice(1)] : []),
    [location.pathname]
  );

  //Get query key-value pairs and add them to an object
  const query = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return { ...Object.fromEntries(queryParams?.entries()) };
  }, [location.search]);


  return { ...location, patharray, query };
}

const getCurrentLocation = () => {
  const {
    href,
    origin,
    protocol,
    host,
    hostname,
    port,
    pathname,
    search,
    hash,
    reload,
    replace
  } = window.location; 
  return {
    href,
    origin,
    protocol,
    host,
    hostname,
    port,
    pathname,
    search,
    hash,
    reload,
    replace
  }
}