"use server";

export const checkNpi = async (npiNumber: string) => {
  const res = await fetch(`https://npiregistry.cms.hhs.gov/api/?number=${npiNumber}&version=2.1`)
    .then((response) => response.json())
    .then((data) => {
      if (data.results && data.results.length > 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => false);
  return res;
};
